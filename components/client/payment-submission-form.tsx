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
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = async (event) => {
        const result = event.target?.result as string
        setFileData(result)

        setIsProcessingOCR(true)
        try {
          const ocr = await processPaymentProof(result)
          setOcrResult(ocr)

          if (ocr.amount && !formData.amount) {
            setFormData((prev) => ({
              ...prev,
              amount: ocr.amount!.toString(),
            }))
          }
        } catch (error) {
          console.error("[v0] OCR processing error:", error)
        } finally {
          setIsProcessingOCR(false)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id || !formData.amount || !formData.description) {
      alert("Please fill in all fields")
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
