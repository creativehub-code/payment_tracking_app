"use client"

import { useEffect, useMemo, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { getMonthlyAggregates, getPaymentsByClient } from "@/lib/payment-store"
import type { MonthlyAggregate, Payment } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarClock, CalendarRange, TrendingUp, CircleSlash, IndianRupee, Filter } from "lucide-react"

type RegisteredClient = ReturnType<ReturnType<typeof useAuth>["getClients"]>[number]

interface ClientMonthlyData {
  client: RegisteredClient
  monthly: Array<MonthlyAggregate & { cumulative: number }>
  lastPayment: Payment | null
  totalApproved: number
}

function formatMonth(month: string) {
  const [year, monthIndex] = month.split("-").map(Number)
  const date = new Date(year, (monthIndex || 1) - 1)
  return date.toLocaleDateString("en-IN", { month: "short", year: "numeric" })
}

function formatCurrency(value: number) {
  return value.toLocaleString("en-IN")
}

export default function ClientMonthlyTracker() {
  const { getClients } = useAuth()
  const [clientMonthlyData, setClientMonthlyData] = useState<ClientMonthlyData[]>([])
  const [selectedClient, setSelectedClient] = useState<string>("all")
  const [selectedMonth, setSelectedMonth] = useState<string>("all")

  useEffect(() => {
    const load = async () => {
      const clients = getClients()
      const enriched = await Promise.all(
        clients.map(async (client) => {
          const [monthlyAggregates, clientPayments] = await Promise.all([
            getMonthlyAggregates(client.id),
            getPaymentsByClient(client.id),
          ])
          let cumulative = 0
          const monthly = monthlyAggregates.map((entry) => {
            cumulative += entry.amount
            return { ...entry, cumulative }
          })
          const sortedPayments = clientPayments.sort(
            (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
          )
          return {
            client,
            monthly,
            lastPayment: sortedPayments[0] ?? null,
            totalApproved: monthly.reduce((sum, entry) => sum + entry.amount, 0),
          }
        }),
      )
      setClientMonthlyData(enriched)
    }

    load()
    const interval = setInterval(load, 3000)
    return () => clearInterval(interval)
  }, [getClients])

  const clientsWithData = useMemo(
    () => clientMonthlyData.sort((a, b) => a.client.name.localeCompare(b.client.name)),
    [clientMonthlyData],
  )

  const monthOptions = useMemo(() => {
    const months = new Set<string>()
    clientMonthlyData.forEach(({ monthly }) => {
      monthly.forEach((entry) => months.add(entry.month))
    })
    return Array.from(months).sort((a, b) => b.localeCompare(a))
  }, [clientMonthlyData])

  const clientOptions = useMemo(
    () => clientMonthlyData.map(({ client }) => ({ id: client.id, name: client.name })).sort((a, b) => a.name.localeCompare(b.name)),
    [clientMonthlyData],
  )

  const filteredClients = useMemo(() => {
    return clientsWithData
      .filter((entry) => (selectedClient === "all" ? true : entry.client.id === selectedClient))
      .map((entry) => {
        const monthly = selectedMonth === "all" ? entry.monthly : entry.monthly.filter((m) => m.month === selectedMonth)
        const totalApproved =
          selectedMonth === "all" ? entry.totalApproved : monthly.reduce((sum, monthEntry) => sum + monthEntry.amount, 0)

        return {
          ...entry,
          monthly,
          totalApproved,
        }
      })
      .filter((entry) => {
        if (selectedMonth === "all") return true
        return entry.monthly.length > 0
      })
  }, [clientsWithData, selectedClient, selectedMonth])

  if (!clientsWithData.length) {
    return null
  }

  return (
    <Card className="border-muted/30 bg-popover-foreground text-foreground">
      <CardHeader className="pb-4 space-y-3">
        <div>
          <div className="flex items-center gap-2">
            <CalendarRange className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm sm:text-lg">Client Monthly Progress</CardTitle>
          </div>
          <p className="text-xs sm:text-sm text-muted">
            Track each client&apos;s approved amount month by month until their most recent payment.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-1 text-xs uppercase tracking-wide text-muted">
            <Filter className="h-3 w-3" />
            Filters
          </div>
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger size="sm" className="min-w-[160px]">
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All clients</SelectItem>
              {clientOptions.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger size="sm" className="min-w-[200px]">
              <SelectValue placeholder="Month & year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All months</SelectItem>
              {monthOptions.map((month) => (
                <SelectItem key={month} value={month}>
                  {formatMonth(month)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredClients.length === 0 && (
          <div className="text-xs text-muted bg-muted-background/30 border border-dashed border-muted/30 rounded-md p-4 text-center">
            No data matches the selected filters.
          </div>
        )}
        {filteredClients.map(({ client, monthly, lastPayment, totalApproved }) => {
          const target = client.targetAmount || 0
          const remaining = client.remainingAmount ?? Math.max(0, target - totalApproved)
          const progressValue = target > 0 ? Math.min(100, (totalApproved / target) * 100) : 0

          return (
            <div
              key={client.id}
              className="rounded-lg border border-muted/20 bg-background/60 p-3 sm:p-4 space-y-3 shadow-sm"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm sm:text-base font-semibold">{client.name}</p>
                  <p className="text-xs text-muted">{client.email}</p>
                  <div className="flex items-center gap-1 text-[11px] text-muted mt-1">
                    {lastPayment ? (
                      <>
                        <CalendarClock className="h-3 w-3" />
                        Last payment: {new Date(lastPayment.submittedAt).toLocaleDateString("en-IN")}
                      </>
                    ) : (
                      <>
                        <CircleSlash className="h-3 w-3" />
                        No payments yet
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-xs text-muted">Target</p>
                  <p className="text-sm sm:text-base font-semibold">
                    ₹{target ? formatCurrency(target) : formatCurrency(0)}
                  </p>
                  <p className="text-xs text-muted">Remaining ₹{formatCurrency(remaining)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Overall progress
                  </span>
                  <span>
                    ₹{formatCurrency(totalApproved)} / ₹{formatCurrency(target)}
                  </span>
                </div>
                <Progress value={progressValue} className="h-2" />
              </div>

              {monthly.length > 0 ? (
                <div className="space-y-2">
                  {monthly.map((entry) => {
                    const monthProgress = target > 0 ? Math.min(100, (entry.cumulative / target) * 100) : 0
                    return (
                      <div
                        key={`${client.id}-${entry.month}`}
                        className="rounded-md border border-muted/10 bg-muted-background/40 p-2 sm:p-3"
                      >
                        <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
                          <span>{formatMonth(entry.month)}</span>
                          <span className="flex items-center gap-1">
                            <IndianRupee className="h-3 w-3" />
                            {formatCurrency(entry.amount)}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-col gap-1">
                          <Progress value={monthProgress} className="h-1.5" />
                          <p className="text-[10px] sm:text-xs text-muted">
                            Cumulative: ₹{formatCurrency(entry.cumulative)} / ₹{formatCurrency(target)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-xs text-muted bg-muted-background/30 border border-dashed border-muted/30 rounded-md p-3 flex items-center gap-2">
                  <CircleSlash className="h-3 w-3" />
                  No approved payments to show yet.
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

