export function extractAmountFromText(text: string): number | null {
  if (!text || typeof text !== "string") return null

  // Normalize whitespace and common non-breaking spaces that OCR may return
  const normalized = text.replace(/[\u00A0\u2009\u202F\u200B\uFEFF]/g, " ").replace(/\s+/g, " ").trim()

  // Helper to clean a captured number string: remove commas/space grouping and keep a single decimal point
  function cleanNumberString(s: string) {
    if (!s) return ""
    // Remove any non-digit or non-dot characters (commas, spaces, NBSP, etc.)
    // Keep digits and dot; if multiple dots exist, keep the first and remove the rest
    let cleaned = s.replace(/[^\d.]/g, "")
    const parts = cleaned.split('.')
    if (parts.length > 1) {
      cleaned = parts[0] + '.' + parts.slice(1).join('')
    }
    return cleaned
  }

  // Quick rupee-first scan (handles ₹, Unicode rupee U+20B9, 'Rs', 'INR')
  const currencySymbolPattern = /(?:₹|\u20B9|Rs\.?|INR)/i
  const rupeeFirst = /(?:₹|\u20B9|Rs\.?|INR)[\s\u00A0\u2009]{0,6}([0-9][0-9,\.\s]*)/i
  const m = normalized.match(rupeeFirst)
  if (m && m[1]) {
    const numStr = cleanNumberString(m[1])
    const amount = Number.parseFloat(numStr)
    if (!isNaN(amount) && amount > 0) return amount
  }

  // Common labeled patterns (amount: 1,234.56 INR) - look for keywords near numbers
  const labeledPatterns = [
    /(?:total|amount|subtotal|grand total|balance|paid|payment|amount paid|paid amount)[:\s]{0,6}([0-9][0-9,\.\s]*)(?:\s*(?:₹|\u20B9|INR|Rs\.?))?/gi,
    /(?:₹|\u20B9|Rs\.?|INR)[:\s]{0,6}([0-9][0-9,\.\s]*)/gi,
  ]

  for (const pat of labeledPatterns) {
    const it = normalized.matchAll(pat)
    for (const match of it) {
      if (match[1]) {
        const numStr = cleanNumberString(match[1])
        const amount = Number.parseFloat(numStr)
        if (!isNaN(amount) && amount > 0) return amount
      }
    }
  }

  // Fallback: find the first reasonably-sized number in the text (2-12 digits, allow grouping and decimals)
  const genericNumber = /([0-9][0-9,\.\s]{0,12}[0-9](?:\.[0-9]{1,2})?)/g
  const genMatch = normalized.matchAll(genericNumber)
  for (const match of genMatch) {
    if (match[1]) {
      // Prefer numbers that appear next to a currency symbol nearby
      const idx = normalized.indexOf(match[1])
      const windowStart = Math.max(0, idx - 12)
      const window = normalized.slice(windowStart, idx + match[1].length + 12)
      if (currencySymbolPattern.test(window) || /paid|amount|total|rupee|rs\.?/i.test(window)) {
        const numStr = cleanNumberString(match[1])
        const amount = Number.parseFloat(numStr)
        if (!isNaN(amount) && amount > 0) return amount
      }
    }
  }

  return null
}

export async function processPaymentProof(fileData: string): Promise<{ text: string; amount: number | null; isPayment: boolean }> {
  // Call the server API route which performs OCR using Google Vision
  try {
    const resp = await fetch("/api/ocr/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileData }),
    })

    if (!resp.ok) {
      const text = await resp.text()
      console.error("OCR server error:", resp.status, text)
      return { text: "", amount: null, isPayment: false }
    }

    const data = await resp.json()
    return {
      text: data.text || "",
      amount: data.amount ?? null,
      isPayment: !!data.isPayment,
    }
  } catch (err) {
    console.error("processPaymentProof fetch error:", err)
    return { text: "", amount: null, isPayment: false }
  }
}
