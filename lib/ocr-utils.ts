export function extractAmountFromText(text: string): number | null {
  const patterns = [
    /₹\s*(\d+(?:[,]\d{3})*(?:[.]\d{2})?)/gi,
    /(\d+(?:[,]\d{3})*(?:[.]\d{2}))\s*(?:INR|rupees?|₹)/gi,
    /total[:\s]+₹?\s*(\d+(?:[,]\d{3})*(?:[.]\d{2})?)/gi,
    /amount[:\s]+₹?\s*(\d+(?:[,]\d{3})*(?:[.]\d{2})?)/gi,
    /price[:\s]+₹?\s*(\d+(?:[,]\d{3})*(?:[.]\d{2})?)/gi,
    /payment[:\s]+₹?\s*(\d+(?:[,]\d{3})*(?:[.]\d{2})?)/gi,
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

  return null
}

export async function processPaymentProof(fileData: string): Promise<{ text: string; amount: number | null }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockText = "Invoice Date: 2025-01-15\nTotal Amount: ₹1,250.00\nDescription: Equipment payment"
      const amount = extractAmountFromText(mockText)

      resolve({
        text: mockText,
        amount,
      })
    }, 1000)
  })
}
