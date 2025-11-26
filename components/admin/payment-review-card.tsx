"use client"

import type { Payment, ClientSummary, MonthlyAggregate } from "@/lib/types"
import { savePayment } from "@/lib/payment-store"
import { createNotification } from "@/lib/notifications"
import { useState, useEffect } from "react"
import ProgressModal from "./progress-modal"
import { getClientByPayment, getMonthlyAggregates, getClientSummary } from "@/lib/payment-store"
import { useAuth } from "@/lib/auth-context"

interface PaymentReviewCardProps {
  payment: Payment
  onUpdate: () => void
}

export default function PaymentReviewCard({ payment, onUpdate }: PaymentReviewCardProps) {
  const [notes, setNotes] = useState(payment.adminNotes || "")
  const [isUpdating, setIsUpdating] = useState(false)
  const [showProgressModal, setShowProgressModal] = useState(false)
  const [summary, setSummary] = useState<ClientSummary | null>(null)
  const [monthlyData, setMonthlyData] = useState<MonthlyAggregate[]>([])
  const { decrementClientRemaining } = useAuth()

  useEffect(() => {
    const loadData = async () => {
      try {
        const [summaryData, monthlyDataData] = await Promise.all([
          getClientSummary(payment.clientId),
          getMonthlyAggregates(payment.clientId),
        ])
        setSummary(summaryData)
        setMonthlyData(monthlyDataData)
      } catch (error) {
        console.error("Error loading payment data:", error)
      }
    }
    loadData()
  }, [payment.clientId])

  const handleApprove = async () => {
    setIsUpdating(true)
    const updated: Payment = {
      ...payment,
      status: "approved",
      reviewedAt: new Date().toISOString(),
      adminNotes: notes,
      approvedAt: new Date().toISOString(),
      approvedBy: "admin_1",
    }
    await savePayment(updated)

    decrementClientRemaining(payment.clientId, payment.amount)

    createNotification(
      payment.clientId,
      "payment_approved",
      payment.id,
      "Payment Approved",
      `Your payment of ₹${payment.amount.toLocaleString("en-IN")} has been approved.`,
    )

    setTimeout(() => {
      setIsUpdating(false)
      setShowProgressModal(true)
      onUpdate()
    }, 300)
  }

  const handleReject = async () => {
    if (!notes.trim()) {
      alert("Please provide a reason for rejection in admin notes")
      return
    }

    setIsUpdating(true)
    const updated: Payment = {
      ...payment,
      status: "rejected",
      reviewedAt: new Date().toISOString(),
      adminNotes: notes,
    }
    await savePayment(updated)

    createNotification(
      payment.clientId,
      "payment_rejected",
      payment.id,
      "Payment Rejected",
      `Your payment of ₹${payment.amount.toLocaleString("en-IN")} has been rejected. Reason: ${notes}`,
    )

    setTimeout(() => {
      setIsUpdating(false)
      onUpdate()
    }, 300)
  }

  const ocrDifference = payment.ocrAmount && payment.amount ? Math.abs(payment.ocrAmount - payment.amount) : 0
  const ocrMatch = payment.ocrAmount && payment.amount ? Math.abs(payment.ocrAmount - payment.amount) < 0.01 : null

  const client = getClientByPayment(payment)

  return (
    <>
      <div className="border border-muted/30 rounded p-2 sm:p-4 bg-muted-background/30 space-y-2 sm:space-y-4">
        {payment.status === "pending" && (
          <div className="flex gap-2 sm:gap-3 p-2 sm:p-3 bg-primary/10 border border-primary/30 rounded-lg">
            <button
              onClick={handleApprove}
              disabled={isUpdating}
              className="flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-lg bg-green-600 text-white text-sm sm:text-base font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md"
            >
              {isUpdating ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Approving...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">✓</span>
                  <span>Approve</span>
                </>
              )}
            </button>
            <button
              onClick={handleReject}
              disabled={isUpdating}
              className="flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-lg bg-red-600 text-white text-sm sm:text-base font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md"
            >
              {isUpdating ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Rejecting...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">✗</span>
                  <span>Reject</span>
                </>
              )}
            </button>
          </div>
        )}

        <div className="flex items-start justify-between">
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-xs sm:text-sm text-muted">Payment ID: {payment.id}</p>
            <p className="text-base sm:text-lg font-semibold text-foreground">
              ₹{payment.amount.toLocaleString("en-IN")}
            </p>
          </div>
          <span
            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-medium ${
              payment.status === "pending"
                ? "bg-warning/20 text-warning"
                : payment.status === "approved"
                  ? "bg-success/20 text-success"
                  : "bg-destructive/20 text-destructive"
            }`}
          >
            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
          <div>
            <p className="text-muted mb-0.5 sm:mb-1">Description</p>
            <p className="text-foreground">{payment.description}</p>
          </div>
          {payment.ocrAmount && (
            <div>
              <p className="text-muted mb-0.5 sm:mb-1">
                OCR Amount{" "}
                {ocrMatch ? <span className="text-success">✓</span> : <span className="text-warning">!</span>}
              </p>
              <p className="text-foreground">
                ₹{payment.ocrAmount.toLocaleString("en-IN")}
                {ocrDifference > 0 && (
                  <span className="text-warning ml-1 sm:ml-2 text-xs">
                    (Diff: ₹{ocrDifference.toLocaleString("en-IN")})
                  </span>
                )}
              </p>
            </div>
          )}
          <div>
            <p className="text-muted mb-0.5 sm:mb-1">Submitted</p>
            <p className="text-foreground">{new Date(payment.submittedAt).toLocaleDateString("en-IN")}</p>
          </div>
          <div>
            <p className="text-muted mb-0.5 sm:mb-1">Client ID</p>
            <p className="text-foreground font-mono text-[10px] sm:text-xs">{payment.clientId}</p>
          </div>
        </div>

        {payment.proofUrl && (
          <div className="border border-muted/30 rounded p-2 sm:p-3 bg-background/50">
            <p className="text-xs sm:text-sm text-muted mb-1 sm:mb-2">Proof Document</p>
            <a
              href={payment.proofUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-xs sm:text-sm break-all"
            >
              View Document
            </a>
          </div>
        )}

        {payment.status === "pending" && (
          <div>
            <label className="block text-xs sm:text-sm text-muted mb-1">Admin Notes (required for rejection)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add admin notes..."
              className="w-full p-2 sm:p-3 rounded bg-background border border-muted text-foreground text-xs sm:text-sm resize-none h-16 sm:h-20"
            />
          </div>
        )}

        {payment.status !== "pending" && payment.adminNotes && (
          <div className="border border-muted/30 rounded p-2 sm:p-3 bg-background/50">
            <p className="text-xs sm:text-sm text-muted mb-0.5 sm:mb-1">Admin Notes</p>
            <p className="text-foreground text-xs sm:text-sm">{payment.adminNotes}</p>
          </div>
        )}
      </div>

      {client && summary && (
        <ProgressModal
          clientId={payment.clientId}
          clientName={client.name}
          summary={summary}
          monthlyData={monthlyData}
          isOpen={showProgressModal}
          onClose={() => setShowProgressModal(false)}
        />
      )}
    </>
  )
}
