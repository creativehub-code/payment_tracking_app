"use client"

import type { Payment } from "@/lib/types"

interface PaymentHistoryCardProps {
  payment: Payment
}

export default function PaymentHistoryCard({ payment }: PaymentHistoryCardProps) {
  return (
    <div className="border border-muted/30 rounded p-4 bg-muted-background/30 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          {payment.ocrAmount && payment.ocrAmount !== payment.amount ? (
            <p className="text-lg font-semibold text-foreground">₹{payment.ocrAmount.toLocaleString("en-IN")} <span className="text-xs text-muted">(extracted)</span></p>
          ) : (
            <p className="text-lg font-semibold text-foreground">₹{payment.amount.toLocaleString("en-IN")}</p>
          )}
          <p className="text-sm text-muted">{payment.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded text-sm font-medium whitespace-nowrap ${
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

      <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t border-muted/30">
        <div>
          <p className="text-muted mb-1">Submitted</p>
          <p className="text-foreground">{new Date(payment.submittedAt).toLocaleDateString()}</p>
        </div>
        {payment.reviewedAt && (
          <div>
            <p className="text-muted mb-1">Reviewed</p>
            <p className="text-foreground">{new Date(payment.reviewedAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>

      {payment.adminNotes && (
        <div className="bg-background/50 border border-muted/30 rounded p-3 text-sm">
          <p className="text-muted mb-1">Admin Notes</p>
          <p className="text-foreground">{payment.adminNotes}</p>
        </div>
      )}

      {payment.proofUrl && (
        <a
          href={payment.proofUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline text-sm inline-block"
        >
          View Proof Document
        </a>
      )}
    </div>
  )
}
