export function extractAmountFromText(text: string): number | null {
  const patterns = [
    /₹\s*(\d+(?:[,]\d{3})*(?:[.]\d{2})?)/gi,
    /(\d+(?:[,]\d{3})*(?:[.]\d{2}))\s*(?:INR|rupees?|rs\.?|rs|₹)/gi,
    /(?:total|amount|subtotal|grand total|balance)[:\s]*₹?\s*(\d+(?:[,]\d{3})*(?:[.]\d{2})?)/gi,
    /(?:paid|payment|paid amount|amount paid|payment of)[:\s]*₹?\s*(\d+(?:[,]\d{3})*(?:[.]\d{2})?)/gi,
    /(?:price|cost)[:\s]*₹?\s*(\d+(?:[,]\d{3})*(?:[.]\d{2})?)/gi,
  ]

  for (const pattern of patterns) {
    const matches = text.matchAll(pattern)
    for (const match of matches) {
      if (match[1]) {
        // Extract the captured group (the number part)
        let numberStr = match[1]
        // Remove commas (Indian number format: 1,250.00)
        numberStr = numberStr.replace(/,/g, "")
        // Parse as float
        const amount = Number.parseFloat(numberStr)
        if (!isNaN(amount) && amount > 0) {
          return amount
        }
      }
    }
  }

  // Fallback: try to find any number with currency symbol
  const fallbackPattern = /₹\s*([\d,]+(?:\.\d{2})?)/gi
  const fallbackMatch = text.match(fallbackPattern)
  if (fallbackMatch) {
    let numberStr = fallbackMatch[0].replace(/₹\s*/gi, "").replace(/,/g, "")
    const amount = Number.parseFloat(numberStr)
    if (!isNaN(amount) && amount > 0) {
      return amount
    }
  }

  // Second fallback: look for numbers with INR/Rs or nearby 'paid' keywords even without symbol
  const nearPattern = /(?:inr|rs\.?|rs|rupees?)?\s*[:\-]?\s*(?:you paid|paid|paid to|payment of|amount)??\s*₹?\s*([0-9]{1,3}(?:[,0-9]*)(?:\.\d{1,2})?)/i
  const nearMatch = text.match(nearPattern)
  if (nearMatch && nearMatch[1]) {
    let numberStr = nearMatch[1].replace(/,/g, "")
    const amount = Number.parseFloat(numberStr)
    if (!isNaN(amount) && amount > 0) {
      return amount
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
