"use client"

import type { MonthlyAggregate, ClientSummary } from "@/lib/types"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState } from "react"

interface MonthlyProgressCardProps {
  summary: ClientSummary
  monthlyData: MonthlyAggregate[]
  targetAmount: number
}

export default function MonthlyProgressCard({ summary, monthlyData, targetAmount }: MonthlyProgressCardProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const selectedPayments = selectedMonth ? monthlyData.find((m) => m.month === selectedMonth)?.payments || [] : []

  const chartData = monthlyData.map((m) => ({
    month: new Date(m.month + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    amount: m.amount,
    monthKey: m.month,
  }))

  return (
    <div className="space-y-4">
      {/* Monthly Chart */}
      {chartData.length > 0 ? (
        <div className="border border-muted/30 rounded p-4 bg-muted-background/10">
          <h4 className="text-sm font-semibold text-foreground mb-4">Monthly Breakdown</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-muted)" />
              <XAxis dataKey="month" stroke="var(--color-muted)" fontSize={12} />
              <YAxis stroke="var(--color-muted)" fontSize={12} />
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
          <h4 className="text-sm font-semibold text-foreground mb-4">
            Payments for{" "}
            {new Date(selectedMonth + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h4>
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
