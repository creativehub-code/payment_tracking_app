"use client"

import type React from "react"
import { useState } from "react"
import { auth as firebaseAuth } from "@/lib/firebase/config"
import { useAuth } from "@/lib/auth-context"
import { getPaymentsByClient } from "@/lib/payment-store"
import type { Payment } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  UserPlus,
  Trash2,
  Eye,
  EyeOff,
  Users,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  IndianRupee,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Edit2,
  Save,
  X,
} from "lucide-react"

function StatusBadge({ status }: { status: Payment["status"] }) {
  const config = {
    pending: { icon: Clock, className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    approved: { icon: CheckCircle, className: "bg-green-500/20 text-green-400 border-green-500/30" },
    rejected: { icon: XCircle, className: "bg-red-500/20 text-red-400 border-red-500/30" },
  }
  const { icon: Icon, className } = config[status]
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs sm:text-sm font-medium border ${className}`}
    >
      <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default function ClientManagement() {
  const { addClient, getClients, deleteClient, updateClientTarget } = useAuth()
  const [clients, setClients] = useState(getClients())
  const [showForm, setShowForm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [clientToDelete, setClientToDelete] = useState<{ id: string; name: string } | null>(null)
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})
  const [expandedClient, setExpandedClient] = useState<string | null>(null)
  const [clientPayments, setClientPayments] = useState<Record<string, Payment[]>>({})
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [makeAdmin, setMakeAdmin] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingTarget, setEditingTarget] = useState<string | null>(null)
  const [editTargetValue, setEditTargetValue] = useState("")

  const toggleClientPayments = async (clientId: string) => {
    if (expandedClient === clientId) {
      setExpandedClient(null)
    } else {
      const payments = await getPaymentsByClient(clientId)
      setClientPayments((prev) => ({ ...prev, [clientId]: payments }))
      setExpandedClient(clientId)
    }
  }

  const getClientStats = (payments: Payment[]) => {
    const total = payments.reduce((sum, p) => sum + p.amount, 0)
    const approved = payments.filter((p) => p.status === "approved").reduce((sum, p) => sum + p.amount, 0)
    const pending = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)
    const rejected = payments.filter((p) => p.status === "rejected").reduce((sum, p) => sum + p.amount, 0)
    return { total, approved, pending, rejected, count: payments.length }
  }

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!email || !password || !name || !targetAmount) {
      setError("All fields are required including target amount")
      return
    }

    const target = Number.parseFloat(targetAmount)
    if (isNaN(target) || target <= 0) {
      setError("Please enter a valid target amount")
      return
    }

    let serverSucceeded = false
    try {
      setIsSubmitting(true)
      if (firebaseAuth && firebaseAuth.currentUser) {
        const idToken = await firebaseAuth.currentUser.getIdToken()
        const res = await fetch("/api/admin/create-client", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ email, password, name, targetAmount: target, makeAdmin }),
        })

        const data = await res.json().catch(() => ({ error: `Invalid JSON from server (status ${res.status})` }))
        if (res.ok && data?.uid) {
          // Create local client with returned uid to keep localStorage in sync
          addClient(email, password, name, target, data.uid)
          setSuccess(`Client "${name}" added successfully with target ₹${target.toLocaleString("en-IN")}`)
          setEmail("")
          setPassword("")
          setName("")
          setTargetAmount("")
          setMakeAdmin(false)
          setClients(getClients())
          setShowForm(false)
          serverSucceeded = true
        } else {
          const errMsg = data?.error || `Server returned ${res.status}`
          setError(`Server error: ${errMsg}. Creating client locally as fallback.`)
        }
      }
    } catch (err: any) {
      console.warn("Server client creation failed, falling back to local:", err)
      setError(`Server client creation failed: ${String(err?.message || err)}. Creating client locally.`)
    } finally {
      setIsSubmitting(false)
    }

    if (serverSucceeded) return

    // Fallback: create client locally (legacy behavior)
    const result = addClient(email, password, name, target)
    if (result.success) {
      setSuccess(`Client "${name}" added successfully with target ₹${target.toLocaleString("en-IN")}`)
      setEmail("")
      setPassword("")
      setName("")
      setTargetAmount("")
      setClients(getClients())
      setShowForm(false)
    } else {
      setError(result.error || "Failed to add client")
    }
  }

  const handleSaveTarget = (clientId: string) => {
    const newTarget = Number.parseFloat(editTargetValue)
    if (isNaN(newTarget) || newTarget <= 0) {
      setError("Please enter a valid target amount")
      return
    }
    updateClientTarget(clientId, newTarget)
    setClients(getClients())
    setEditingTarget(null)
    setEditTargetValue("")
    setSuccess("Target amount updated successfully")
  }

  const handleDeleteClient = (clientId: string, clientName: string) => {
    setClientToDelete({ id: clientId, name: clientName })
    setShowDeleteConfirm(clientId)
  }

  const confirmDelete = () => {
    if (clientToDelete) {
      deleteClient(clientToDelete.id)
      setClients(getClients())
      setSuccess(`Client "${clientToDelete.name}" has been removed successfully`)
      setShowDeleteConfirm(null)
      setClientToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(null)
    setClientToDelete(null)
  }

  const togglePasswordVisibility = (clientId: string) => {
    setShowPasswords((prev) => ({ ...prev, [clientId]: !prev[clientId] }))
  }

  return (
    <Card className="border-muted/30 text-slate-400 font-sans bg-popover-foreground">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-lg">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <span className="hidden sm:inline">Client Management</span>
            <span className="sm:hidden">Clients</span>
          </CardTitle>
          <Button
            onClick={() => setShowForm(!showForm)}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-auto"
          >
            <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
            <span className="hidden sm:inline">Add Client</span>
            <span className="sm:hidden ml-1">Add</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-destructive/20 text-destructive border border-destructive/30 rounded p-2 sm:p-3 text-xs sm:text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/20 text-green-400 border border-green-500/30 rounded p-2 sm:p-3 text-xs sm:text-sm">
            {success}
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleAddClient}
            className="bg-muted-background/50 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4 border border-muted/30"
          >
            <h3 className="font-medium text-foreground text-sm sm:text-base">Add New Client</h3>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Client Name"
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded bg-background border border-muted/30 text-foreground text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded bg-background border border-muted/30 text-foreground text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted mb-1">Password</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Set password"
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded bg-background border border-muted/30 text-foreground text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted mb-1 flex items-center gap-1">
                  <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                  Target Amount (₹)
                </label>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="e.g., 100000"
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded bg-background border border-muted/30 text-foreground text-xs sm:text-sm"
                  required
                  min="1"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-2 text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    checked={makeAdmin}
                    onChange={(e) => setMakeAdmin(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Make this user an admin</span>
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm px-2 sm:px-3 h-auto py-1.5 sm:py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? <span className="hidden sm:inline">Creating…</span> : <span className="hidden sm:inline">Create Client</span>}
                {isSubmitting ? <span className="sm:hidden">Creating</span> : <span className="sm:hidden">Create</span>}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="text-xs sm:text-sm px-2 sm:px-3 h-auto py-1.5 sm:py-2"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {showDeleteConfirm && clientToDelete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background border border-muted/30 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-destructive/20 p-2 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Remove Client</h3>
              </div>
              <p className="text-muted mb-2">Are you sure you want to remove this client?</p>
              <p className="text-foreground font-medium mb-4 bg-muted-background/50 p-2 rounded">
                {clientToDelete.name}
              </p>
              <p className="text-sm text-destructive/80 mb-6">
                This action cannot be undone. All payment data associated with this client will remain in the system.
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={cancelDelete}>
                  Cancel
                </Button>
                <Button
                  onClick={confirmDelete}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                  Remove Client
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-medium text-muted">Registered Clients ({clients.length})</h3>
            {clients.length > 0 && (
              <span className="text-[10px] sm:text-xs text-muted hidden sm:inline">
                Click on client to view payments
              </span>
            )}
          </div>
          {clients.length > 0 ? (
            <div className="divide-y divide-muted/20 border border-muted/20 rounded-lg overflow-hidden">
              {clients.map((client) => {
                const isExpanded = expandedClient === client.id
                const payments = clientPayments[client.id] || []
                // Ensure payments is an array before calling getClientStats
                const stats = getClientStats(Array.isArray(payments) ? payments : [])
                const isEditingThis = editingTarget === client.id

                return (
                  <div key={client.id} className="bg-muted-background/30">
                    <div
                      className="flex items-center justify-between p-2 sm:p-4 hover:bg-muted-background/50 transition-colors cursor-pointer"
                      onClick={() => toggleClientPayments(client.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground text-xs sm:text-base truncate">{client.name}</p>
                          {isExpanded ? (
                            <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted shrink-0" />
                          ) : (
                            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-muted shrink-0" />
                          )}
                        </div>
                        <p className="text-[10px] sm:text-sm text-muted truncate">{client.email}</p>
                        <div className="flex items-center gap-1 sm:gap-2 mt-1">
                          <span className="text-[10px] sm:text-xs text-muted">Pwd:</span>
                          <span className="text-[10px] sm:text-xs font-mono bg-muted-background px-1 sm:px-2 py-0.5 rounded">
                            {showPasswords[client.id] ? client.password : "••••"}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              togglePasswordVisibility(client.id)
                            }}
                            className="text-muted hover:text-foreground"
                          >
                            {showPasswords[client.id] ? (
                              <EyeOff className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            ) : (
                              <Eye className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <div className="flex items-center gap-1 bg-primary/20 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs">
                            <Target className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
                            <span className="text-primary font-medium">
                              ₹{(client.targetAmount || 0).toLocaleString("en-IN")}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 bg-yellow-500/20 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs">
                            <IndianRupee className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-400" />
                            <span className="text-yellow-400 font-medium">
                              Remaining: ₹{(client.remainingAmount || 0).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 ml-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingTarget(client.id)
                            setEditTargetValue(String(client.targetAmount || 0))
                          }}
                          className="text-primary border-primary/30 hover:bg-primary/20 hover:border-primary/50 text-[10px] sm:text-sm px-1.5 sm:px-3 py-1 sm:py-2 h-auto"
                        >
                          <Edit2 className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteClient(client.id, client.name)
                          }}
                          className="text-destructive border-destructive/30 hover:bg-destructive/20 hover:border-destructive/50 text-[10px] sm:text-sm px-1.5 sm:px-3 py-1 sm:py-2 h-auto"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                          <span className="hidden sm:inline">Remove</span>
                        </Button>
                      </div>
                    </div>

                    {isEditingThis && (
                      <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setEditingTarget(null)}
                      >
                        <div
                          className="bg-background border border-muted/30 rounded-lg p-4 sm:p-6 max-w-md w-full mx-4 shadow-xl"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="bg-primary/20 p-2 rounded-full">
                              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-foreground">Update Target Amount</h3>
                          </div>
                          <p className="text-muted mb-2 text-sm">
                            Client: <span className="text-foreground font-medium">{client.name}</span>
                          </p>
                          <div className="mb-4">
                            <label className="block text-xs sm:text-sm font-medium text-muted mb-1">
                              New Target Amount (₹)
                            </label>
                            <input
                              type="number"
                              value={editTargetValue}
                              onChange={(e) => setEditTargetValue(e.target.value)}
                              className="w-full px-3 py-2 rounded bg-muted-background border border-muted/30 text-foreground text-sm"
                              min="1"
                              autoFocus
                            />
                          </div>
                          <div className="flex gap-3 justify-end">
                            <Button variant="outline" onClick={() => setEditingTarget(null)}>
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                            <Button
                              onClick={() => handleSaveTarget(client.id)}
                              className="bg-primary hover:bg-primary/90"
                            >
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {isExpanded && (
                      <div className="border-t border-muted/20 bg-background/50 p-2 sm:p-4">
                        {/* Payment Statistics */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className="bg-primary/10 rounded-lg p-2 sm:p-3 text-center border border-primary/20">
                            <p className="text-[10px] sm:text-xs text-primary mb-1">Target</p>
                            <p className="text-xs sm:text-lg font-bold text-primary">
                              ₹{(client.targetAmount || 0).toLocaleString("en-IN")}
                            </p>
                          </div>
                          <div className="bg-yellow-500/10 rounded-lg p-2 sm:p-3 text-center border border-yellow-500/20">
                            <p className="text-[10px] sm:text-xs text-yellow-400 mb-1">Remaining</p>
                            <p className="text-xs sm:text-lg font-bold text-yellow-400">
                              ₹{(client.remainingAmount || 0).toLocaleString("en-IN")}
                            </p>
                          </div>
                          <div className="bg-green-500/10 rounded-lg p-2 sm:p-3 text-center border border-green-500/20">
                            <p className="text-[10px] sm:text-xs text-green-400 mb-1">Approved</p>
                            <p className="text-xs sm:text-lg font-bold text-green-400">
                              ₹{stats.approved.toLocaleString("en-IN")}
                            </p>
                          </div>
                          <div className="bg-orange-500/10 rounded-lg p-2 sm:p-3 text-center border border-orange-500/20">
                            <p className="text-[10px] sm:text-xs text-orange-400 mb-1">Pending</p>
                            <p className="text-xs sm:text-lg font-bold text-orange-400">
                              ₹{stats.pending.toLocaleString("en-IN")}
                            </p>
                          </div>
                          <div className="bg-red-500/10 rounded-lg p-2 sm:p-3 text-center border border-red-500/20">
                            <p className="text-[10px] sm:text-xs text-red-400 mb-1">Rejected</p>
                            <p className="text-xs sm:text-lg font-bold text-red-400">
                              ₹{stats.rejected.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>

                        {/* Payment List */}
                        <h4 className="text-xs sm:text-sm font-medium text-foreground mb-2 sm:mb-3 flex items-center gap-2">
                          <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                          Payment History ({payments.length})
                        </h4>
                        {payments.length > 0 ? (
                          <div className="space-y-2 max-h-60 sm:max-h-80 overflow-y-auto">
                            {payments
                              .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                              .map((payment) => (
                                <div
                                  key={payment.id}
                                  className="bg-muted-background/30 border border-muted/20 rounded-lg p-2 sm:p-3"
                                >
                                  <div className="flex items-start justify-between gap-2 sm:gap-3">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="font-semibold text-foreground flex items-center text-xs sm:text-base">
                                          <IndianRupee className="h-3 w-3 sm:h-4 sm:w-4" />
                                          {payment.amount.toLocaleString("en-IN")}
                                        </span>
                                        <StatusBadge status={payment.status} />
                                      </div>
                                      <p className="text-[10px] sm:text-sm text-muted truncate">
                                        {payment.description}
                                      </p>
                                      <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2 text-[10px] sm:text-xs text-muted flex-wrap">
                                        <span className="flex items-center gap-1">
                                          <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                          {new Date(payment.submittedAt).toLocaleDateString("en-IN")}
                                        </span>
                                        {payment.reviewedAt && (
                                          <span>Rev: {new Date(payment.reviewedAt).toLocaleDateString("en-IN")}</span>
                                        )}
                                      </div>
                                      {payment.ocrAmount && (
                                        <p className="text-[10px] sm:text-xs text-muted mt-1">
                                          OCR: ₹{payment.ocrAmount.toLocaleString("en-IN")}
                                        </p>
                                      )}
                                      {payment.adminNotes && (
                                        <div className="mt-1 sm:mt-2 p-1.5 sm:p-2 bg-muted-background/50 rounded text-[10px] sm:text-xs">
                                          <span className="text-muted">Notes: </span>
                                          <span className="text-foreground">{payment.adminNotes}</span>
                                        </div>
                                      )}
                                    </div>
                                    {payment.proofUrl && (
                                      <a
                                        href={payment.proofUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0 text-primary hover:text-primary/80 text-[10px] sm:text-xs underline"
                                      >
                                        Proof
                                      </a>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <p className="text-[10px] sm:text-sm text-muted py-3 sm:py-4 text-center bg-muted-background/30 rounded">
                            No payments yet.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8 bg-muted-background/30 rounded border border-muted/20">
              <Users className="h-8 w-8 sm:h-12 sm:w-12 text-muted mx-auto mb-2" />
              <p className="text-muted text-xs sm:text-sm">No clients registered yet</p>
              <p className="text-[10px] sm:text-xs text-muted mt-1">
                Click &quot;Add Client&quot; to register a new client
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
