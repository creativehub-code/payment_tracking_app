"use client"

import type { MonthlyAggregate, ClientSummary } from "@/lib/types"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState } from "react"
import { X } from "lucide-react"

interface ProgressModalProps {
  clientId: string
  clientName: string
  summary: ClientSummary
  monthlyData: MonthlyAggregate[]
  isOpen: boolean
  onClose: () => void
}

export default function ProgressModal({
  clientId,
  clientName,
  summary,
  monthlyData,
  isOpen,
  onClose,
}: ProgressModalProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const selectedPayments = selectedMonth ? monthlyData.find((m) => m.month === selectedMonth)?.payments || [] : []

  if (!isOpen) return null

  const chartData = monthlyData.map((m) => ({
    month: new Date(m.month + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    amount: m.amount,
    monthKey: m.month,
  }))

  const handleExportCSV = () => {
    let csv = "Month,Amount\n"
    monthlyData.forEach((m) => {
      const monthName = new Date(m.month + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" })
      csv += `${monthName},${m.amount}\n`
    })
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${clientName}-progress.csv`
    a.click()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-muted/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-muted/30 sticky top-0 bg-background">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Client Monthly Progress</h2>
            <p className="text-sm text-muted mt-1">{clientName}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-foreground transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted-background/30 border border-muted/30 rounded p-4">
              <p className="text-xs text-muted mb-1">Target</p>
              <p className="text-lg font-bold text-foreground">₹{summary.targetAmount.toLocaleString()}</p>
            </div>
            <div className="bg-success/10 border border-muted/30 rounded p-4">
              <p className="text-xs text-muted mb-1">Total Approved</p>
              <p className="text-lg font-bold text-success">₹{summary.totalApproved.toLocaleString()}</p>
            </div>
            <div className="bg-warning/10 border border-muted/30 rounded p-4">
              <p className="text-xs text-muted mb-1">Remaining</p>
              <p className="text-lg font-bold text-warning">₹{summary.remaining.toLocaleString()}</p>
            </div>
            <div className="bg-primary/10 border border-muted/30 rounded p-4">
              <p className="text-xs text-muted mb-1">Target Reached</p>
              <p className="text-lg font-bold text-primary">
                {summary.targetReachedMonth
                  ? new Date(summary.targetReachedMonth + "-01").toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "Pending"}
              </p>
            </div>
          </div>

          {/* Chart */}
          {chartData.length > 0 ? (
            <div className="border border-muted/30 rounded p-4 bg-muted-background/10">
              <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Payments Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-muted)" />
                  <XAxis dataKey="month" stroke="var(--color-muted)" />
                  <YAxis stroke="var(--color-muted)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-background)",
                      border: "1px solid var(--color-muted)",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => `₹${value.toLocaleString()}`}
                  />
                  <Bar
                    dataKey="amount"
                    fill="var(--color-primary)"
                    onClick={(data) => setSelectedMonth(data.payload.monthKey)}
                    cursor="pointer"
                  />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted mt-2">Click a bar to view payments for that month</p>
            </div>
          ) : (
            <div className="text-center py-8 bg-muted-background/10 rounded border border-muted/30">
              <p className="text-muted">No approved payments yet</p>
            </div>
          )}

          {/* Drill-down */}
          {selectedMonth && selectedPayments.length > 0 && (
            <div className="border border-muted/30 rounded p-4 bg-muted-background/10">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Payments for{" "}
                {new Date(selectedMonth + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {selectedPayments.map((payment) => (
                  <div key={payment.id} className="bg-background border border-muted/30 rounded p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">₹{payment.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted">
                          {new Date(payment.approvedAt || payment.submittedAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {payment.proofUrl && (
                        <a
                          href={payment.proofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-xs"
                        >
                          View
                        </a>
                      )}
                    </div>
                    {payment.description && <p className="text-xs text-foreground mt-1">{payment.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Export */}
          <div className="flex gap-3 pt-4 border-t border-muted/30">
            <button
              onClick={handleExportCSV}
              className="flex-1 py-2 px-4 rounded bg-muted-background text-foreground font-medium hover:bg-muted-background/80 transition-colors"
            >
              Export CSV
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 rounded bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
