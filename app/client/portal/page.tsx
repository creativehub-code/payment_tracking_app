"use client"

import { useAuth } from "@/lib/auth-context"
import { getPaymentsByClient, getMonthlyAggregates } from "@/lib/payment-store"
import type { Payment, MonthlyAggregate } from "@/lib/types"
import { useEffect, useState } from "react"
import PaymentSubmissionForm from "@/components/client/payment-submission-form"
import PaymentHistoryCard from "@/components/client/payment-history-card"
import MonthlyProgressCard from "@/components/client/monthly-progress-card"
import { Target, IndianRupee, TrendingDown } from "lucide-react"

export default function ClientPortal() {
  const { user, getClientById } = useAuth()
  const [payments, setPayments] = useState<Payment[]>([])
  const [clientInfo, setClientInfo] = useState<{ targetAmount: number; remainingAmount: number } | null>(null)
  const [monthlyData, setMonthlyData] = useState<MonthlyAggregate[]>([])

  useEffect(() => {
    if (user?.id) {
      const loadData = async () => {
        const [clientPayments, monthly] = await Promise.all([
          getPaymentsByClient(user.id),
          getMonthlyAggregates(user.id),
        ])
        setPayments(clientPayments)
        setMonthlyData(monthly)

        const client = getClientById(user.id)
        if (client) {
          setClientInfo({
            targetAmount: client.targetAmount,
            remainingAmount: client.remainingAmount,
          })
        }
      }

      loadData()

      const interval = setInterval(async () => {
        const [clientPayments, monthly] = await Promise.all([
          getPaymentsByClient(user.id),
          getMonthlyAggregates(user.id),
        ])
        setPayments(clientPayments)
        setMonthlyData(monthly)
        const updatedClient = getClientById(user.id)
        if (updatedClient) {
          setClientInfo({
            targetAmount: updatedClient.targetAmount,
            remainingAmount: updatedClient.remainingAmount,
          })
        }
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [user?.id, getClientById])

  const stats = {
    pending: payments.filter((p) => p.status === "pending").length,
    approved: payments.filter((p) => p.status === "approved").length,
    rejected: payments.filter((p) => p.status === "rejected").length,
  }

  const approvedTotal = payments.filter((p) => p.status === "approved").reduce((sum, p) => sum + p.amount, 0)

  const summary = clientInfo
    ? {
        targetAmount: clientInfo.targetAmount,
        totalApproved: approvedTotal,
        remaining: clientInfo.remainingAmount,
      }
    : { targetAmount: 10000, totalApproved: 0, remaining: 10000 }

  const progressPercent =
    clientInfo && clientInfo.targetAmount > 0
      ? Math.min(100, ((clientInfo.targetAmount - clientInfo.remainingAmount) / clientInfo.targetAmount) * 100)
      : 0

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {clientInfo && (
        <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-lg p-4 sm:p-6">
          <h2 className="text-sm sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
            <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Payment Target
          </h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="bg-background/50 rounded-lg p-2 sm:p-4 text-center">
              <p className="text-[10px] sm:text-sm text-muted mb-1">Total Target</p>
              <p className="text-sm sm:text-2xl font-bold text-primary flex items-center justify-center">
                <IndianRupee className="h-3 w-3 sm:h-5 sm:w-5" />
                {clientInfo.targetAmount.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-background/50 rounded-lg p-2 sm:p-4 text-center">
              <p className="text-[10px] sm:text-sm text-muted mb-1">Paid</p>
              <p className="text-sm sm:text-2xl font-bold text-green-500 flex items-center justify-center">
                <IndianRupee className="h-3 w-3 sm:h-5 sm:w-5" />
                {(clientInfo.targetAmount - clientInfo.remainingAmount).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-background/50 rounded-lg p-2 sm:p-4 text-center">
              <p className="text-[10px] sm:text-sm text-muted mb-1 flex items-center justify-center gap-1">
                <TrendingDown className="h-3 w-3" />
                Remaining
              </p>
              <p className="text-sm sm:text-2xl font-bold text-yellow-500 flex items-center justify-center">
                <IndianRupee className="h-3 w-3 sm:h-5 sm:w-5" />
                {clientInfo.remainingAmount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <div className="flex justify-between text-[10px] sm:text-sm">
              <span className="text-muted">Progress</span>
              <span className="text-foreground font-medium">{progressPercent.toFixed(1)}%</span>
            </div>
            <div className="h-2 sm:h-3 bg-background/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-green-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        <div className="bg-muted-background/30 border border-muted/30 rounded p-2 sm:p-4">
          <p className="text-[10px] sm:text-sm text-muted mb-1">Total Submitted</p>
          <p className="text-xl sm:text-3xl font-bold text-foreground">{payments.length}</p>
        </div>
        <div className="bg-warning/10 border border-muted/30 rounded p-2 sm:p-4">
          <p className="text-[10px] sm:text-sm text-muted mb-1">Pending</p>
          <p className="text-xl sm:text-3xl font-bold text-warning">{stats.pending}</p>
        </div>
        <div className="bg-success/10 border border-muted/30 rounded p-2 sm:p-4">
          <p className="text-[10px] sm:text-sm text-muted mb-1">Approved</p>
          <p className="text-xl sm:text-3xl font-bold text-success">₹{approvedTotal.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-destructive/10 border border-muted/30 rounded p-2 sm:p-4">
          <p className="text-[10px] sm:text-sm text-muted mb-1">Rejected</p>
          <p className="text-xl sm:text-3xl font-bold text-destructive">{stats.rejected}</p>
        </div>
      </div>

      <MonthlyProgressCard summary={summary} monthlyData={monthlyData} targetAmount={summary.targetAmount} />

      <div className="bg-primary/10 border border-primary/20 rounded p-4">
        <p className="text-sm text-muted">How to submit a payment:</p>
        <ul className="text-sm text-foreground mt-2 space-y-1 ml-4 list-disc">
          <li>Fill in the payment details and amount</li>
          <li>Attach a proof document (receipt, invoice, screenshot)</li>
          <li>Submit for review - our OCR system will verify the amount</li>
          <li>Wait for admin approval</li>
        </ul>
      </div>

      <PaymentSubmissionForm
        onSubmit={async () => {
          const clientPayments = await getPaymentsByClient(user!.id)
          setPayments(clientPayments)
        }}
      />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Payment History</h2>
        {payments.length > 0 ? (
          <div className="grid gap-4">
            {payments.map((payment) => (
              <PaymentHistoryCard key={payment.id} payment={payment} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted-background rounded border border-muted/30">
            <p className="text-muted">No payments submitted yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
