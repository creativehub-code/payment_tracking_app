"use client"

type FilterType = "all" | "pending" | "approved" | "rejected"

interface StatCard {
  label: string
  value: number
  color: string
  filter: FilterType
}

interface PaymentStatsProps {
  stats: {
    pending: number
    approved: number
    rejected: number
    total: number
  }
  onFilterChange?: (filter: FilterType) => void
  activeFilter?: FilterType
}

export default function PaymentStats({ stats, onFilterChange, activeFilter = "all" }: PaymentStatsProps) {
  const cards: StatCard[] = [
    { label: "Total Payments", value: stats.total, color: "bg-muted-background", filter: "all" },
    { label: "Pending Review", value: stats.pending, color: "bg-warning/10", filter: "pending" },
    { label: "Approved", value: stats.approved, color: "bg-success/10", filter: "approved" },
    { label: "Rejected", value: stats.rejected, color: "bg-destructive/10", filter: "rejected" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
      {cards.map((card) => (
        <button
          key={card.label}
          onClick={() => onFilterChange?.(card.filter)}
          className={`p-2 sm:p-4 rounded border text-left transition-all ${card.color} ${
            activeFilter === card.filter
              ? "border-primary ring-2 ring-primary/30"
              : "border-muted/30 hover:border-primary/50"
          } cursor-pointer hover:scale-[1.02] active:scale-[0.98]`}
        >
          <p className="text-xs sm:text-sm text-muted mb-1">{card.label}</p>
          <p className="text-xl sm:text-3xl font-bold text-foreground">{card.value}</p>
        </button>
      ))}
    </div>
  )
}
