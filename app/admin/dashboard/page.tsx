"use client"

import type { Payment } from "@/lib/types"
import { getPayments, subscribeToPayments } from "@/lib/payment-store"
import { useEffect, useState } from "react"
import PaymentReviewCard from "@/components/admin/payment-review-card"
import PaymentStats from "@/components/admin/payment-stats"
import ClientManagement from "@/components/admin/client-management"
import ClientMonthlyTracker from "@/components/admin/client-monthly-tracker"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [filter, setFilter] = useState<Payment["status"] | "all">("all")
  const [showMonthlyTracker, setShowMonthlyTracker] = useState(false)

  useEffect(() => {
    const loadPayments = async () => {
      const allPayments = await getPayments()
      setPayments(allPayments)
    }

    loadPayments()

    // Use subscription for real-time updates (works with both Firebase and localStorage)
    const unsubscribe = subscribeToPayments((allPayments) => {
      setPayments(allPayments)
    })

    // Fallback polling for localStorage mode
    const interval = setInterval(() => {
      loadPayments()
    }, 2000)

    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [])

  const filteredPayments = filter === "all" ? payments : payments.filter((p) => p.status === filter)

  const stats = {
    pending: payments.filter((p) => p.status === "pending").length,
    approved: payments.filter((p) => p.status === "approved").length,
    rejected: payments.filter((p) => p.status === "rejected").length,
    total: payments.length,
  }

  return (
    <div className="space-y-6">
      <ClientManagement />

      <PaymentStats stats={stats} onFilterChange={setFilter} activeFilter={filter} />

      <div className="flex justify-end">
        <Button
          variant={showMonthlyTracker ? "secondary" : "outline"}
          onClick={() => setShowMonthlyTracker((prev) => !prev)}
          className="text-xs sm:text-sm"
        >
          {showMonthlyTracker ? "Hide" : "Show"} Client Monthly Progress
        </Button>
      </div>

      {showMonthlyTracker && <ClientMonthlyTracker />}

      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-muted">Filter:</span>
          {(["all", "pending", "approved", "rejected"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                filter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted-background text-muted hover:bg-muted-background/80"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <PaymentReviewCard
                key={payment.id}
                payment={payment}
                onUpdate={async () => {
                  const updatedPayments = await getPayments()
                  setPayments(updatedPayments)
                }}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-muted-background rounded border border-muted/30">
              <p className="text-muted">No payments to review</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
