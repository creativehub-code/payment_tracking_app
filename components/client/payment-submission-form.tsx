"use client"

import type React from "react"
import { processPaymentProof } from "@/lib/ocr-utils"
import { useAuth } from "@/lib/auth-context"
import { savePayment } from "@/lib/payment-store"
import type { Payment } from "@/lib/types"
import { useState, useRef } from "react"

interface PaymentSubmissionFormProps {
  onSubmit: () => void
}

export default function PaymentSubmissionForm({ onSubmit }: PaymentSubmissionFormProps) {
  const { user } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    amount: "",
    description: "payment",
  })
  const [fileName, setFileName] = useState<string>("")
  const [fileData, setFileData] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessingOCR, setIsProcessingOCR] = useState(false)
  const [ocrResult, setOcrResult] = useState<{
    amount: number | null
    text: string
    isPayment?: boolean
  } | null>(null)
  const [confirmNotPayment, setConfirmNotPayment] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const MAX_IMAGE_SIZE_BYTES = 3 * 1024 * 1024 // 3 MB target after resize
      const MAX_DIMENSION = 1280

      const isImage = file.type.startsWith("image/")
      const isPdf = file.type === "application/pdf"

      setFileName(file.name)

      const readAsDataUrl = (f: File) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (ev) => resolve(ev.target?.result as string)
          reader.onerror = (err) => reject(err)
          reader.readAsDataURL(f)
        })

      // Resize an image data URL to a max dimension and quality
      const resizeImageDataUrl = (
        dataUrl: string,
        maxDim = MAX_DIMENSION,
        quality = 0.8
      ): Promise<string> => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            let { width, height } = img
            if (width <= maxDim && height <= maxDim) {
              // no resize needed
              resolve(dataUrl)
              return
            }

            const aspect = width / height
            if (width > height) {
              width = maxDim
              height = Math.round(maxDim / aspect)
            } else {
              height = maxDim
              width = Math.round(maxDim * aspect)
            }

            const canvas = document.createElement("canvas")
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext("2d")
            if (!ctx) return reject(new Error("Canvas not supported"))
            ctx.drawImage(img, 0, 0, width, height)

            // Convert to JPEG to reduce size (acceptable for receipts)
            const resized = canvas.toDataURL("image/jpeg", quality)
            resolve(resized)
          }
          img.onerror = (err) => reject(err)
          img.src = dataUrl
        })
      }

      ;(async () => {
        try {
          setIsProcessingOCR(true)

          if (isPdf) {
            // PDFs: read directly, no client-side resize
            const dataUrl = await readAsDataUrl(file)
            setFileData(dataUrl)

            const ocr = await processPaymentProof(dataUrl)
            setOcrResult(ocr)
            if (ocr.amount && !formData.amount) {
              setFormData((prev) => ({ ...prev, amount: ocr.amount!.toString() }))
            }
            if (ocr.isPayment) setConfirmNotPayment(false)
            return
          }

          if (isImage) {
            // If the image is already small enough, just read it
            if (file.size <= MAX_IMAGE_SIZE_BYTES) {
              const dataUrl = await readAsDataUrl(file)
              setFileData(dataUrl)

              const ocr = await processPaymentProof(dataUrl)
              setOcrResult(ocr)
              if (ocr.amount && !formData.amount) {
                setFormData((prev) => ({ ...prev, amount: ocr.amount!.toString() }))
              }
              if (ocr.isPayment) setConfirmNotPayment(false)
              return
            }

            // Otherwise, read and resize
            const originalDataUrl = await readAsDataUrl(file)
            let resized = await resizeImageDataUrl(originalDataUrl, MAX_DIMENSION, 0.8)

            // If resized still too big, reduce quality iteratively
            let attemptQuality = 0.75
            while (resized.length > MAX_IMAGE_SIZE_BYTES * 1.37 && attemptQuality >= 0.4) {
              // approximate: dataURL size ~ 1.37 * binary size
              resized = await resizeImageDataUrl(originalDataUrl, MAX_DIMENSION, attemptQuality)
              attemptQuality -= 0.15
            }

            setFileData(resized)
            // update filename extension to jpg for clarity
            if (!fileName.toLowerCase().endsWith(".jpg") && !fileName.toLowerCase().endsWith(".jpeg")) {
              setFileName((n) => n.replace(/\.[^.]+$/, "") + ".jpg")
            }

            const ocr = await processPaymentProof(resized)
            setOcrResult(ocr)
            if (ocr.amount && !formData.amount) {
              setFormData((prev) => ({ ...prev, amount: ocr.amount!.toString() }))
            }
            if (ocr.isPayment) setConfirmNotPayment(false)
          } else {
            // Unknown type: attempt to read and process, but warn user
            const dataUrl = await readAsDataUrl(file)
            setFileData(dataUrl)
            const ocr = await processPaymentProof(dataUrl)
            setOcrResult(ocr)
            if (ocr.amount && !formData.amount) {
              setFormData((prev) => ({ ...prev, amount: ocr.amount!.toString() }))
            }
            if (ocr.isPayment) setConfirmNotPayment(false)
          }
        } catch (error) {
          console.error("[v0] OCR processing error:", error)
          alert("Failed to process uploaded file. Please try a smaller image or a different file.")
        } finally {
          setIsProcessingOCR(false)
        }
      })()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id || !formData.amount || !formData.description) {
      alert("Please fill in all fields")
      return
    }

    // If OCR ran and didn't detect a payment-like screenshot, require confirmation
    // But allow submission when OCR did extract an amount (amount implies payment)
    if (ocrResult && ocrResult.isPayment === false && !confirmNotPayment && !ocrResult.amount) {
      alert("Uploaded document does not look like a payment screenshot. Please confirm to proceed.")
      return
    }

    setIsSubmitting(true)

    try {
      const payment: Payment = {
        id: `payment_${Date.now()}`,
        clientId: user.id,
        amount: Number.parseFloat(formData.amount),
        description: formData.description,
        proofUrl: fileData || undefined,
        ocrAmount: ocrResult?.amount || undefined,
        status: "pending",
        submittedAt: new Date().toISOString(),
      }

      await savePayment(payment)

      setFormData({ amount: "", description: "payment" })
      setFileName("")
      setFileData("")
      setOcrResult(null)
      setConfirmNotPayment(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      onSubmit()
      alert("Payment submitted successfully!")
    } catch (error) {
      console.error("[v0] Error submitting payment:", error)
      alert("Failed to submit payment")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-muted-background/30 border border-muted/30 rounded p-6">
      <h2 className="text-lg font-semibold text-foreground">Submit Payment Proof</h2>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Amount</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="0.00"
          className="w-full px-3 py-2 rounded"
          required
        />
        {ocrResult?.amount && (
          <p className="text-xs text-muted mt-1">OCR detected: ₹{ocrResult.amount.toLocaleString("en-IN")}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="e.g., Invoice payment, Equipment purchase"
          className="w-full px-3 py-2 rounded resize-none h-20"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Proof Document</label>
        <div className="flex items-center gap-3">
          <input ref={fileInputRef} type="file" onChange={handleFileChange} accept="image/*,.pdf" className="hidden" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded bg-muted-background border border-muted hover:bg-muted-background/80 text-foreground text-sm"
          >
            Choose File
          </button>
          {fileName && <span className="text-sm text-muted">{fileName}</span>}
          {isProcessingOCR && <span className="text-xs text-primary animate-pulse">Processing with OCR...</span>}
        </div>
      </div>

      {ocrResult && (
        <div className="text-sm mt-2">
          <p className="text-muted">OCR text preview:</p>
          <div className="bg-background/50 border border-muted/20 rounded p-2 mt-1 text-xs whitespace-pre-wrap">{ocrResult.text}</div>
          {ocrResult.amount ? (
            <p className="text-xs text-muted mt-2">Extracted amount: ₹{ocrResult.amount.toLocaleString("en-IN")}</p>
          ) : (
            <p className="text-xs text-muted mt-2">No amount detected by OCR</p>
          )}

          {ocrResult.isPayment === false ? (
            <div className="mt-2">
              <p className="text-xs text-warning">This doesn't look like a payment screenshot.</p>
              <label className="inline-flex items-center gap-2 mt-1 text-xs">
                <input
                  type="checkbox"
                  checked={confirmNotPayment}
                  onChange={(e) => setConfirmNotPayment(e.target.checked)}
                />
                <span>Confirm and submit anyway</span>
              </label>
            </div>
          ) : null}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 rounded bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {isSubmitting ? "Submitting..." : "Submit Payment"}
      </button>
    </form>
  )
}
