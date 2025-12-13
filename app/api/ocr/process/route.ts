import { NextResponse } from "next/server"
import { extractAmountFromText } from "@/lib/ocr-utils"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fileData } = body

    if (!fileData || typeof fileData !== "string") {
      return NextResponse.json({ error: "Missing fileData" }, { status: 400 })
    }

    // Extract base64 payload from data URL
    const commaIndex = fileData.indexOf(",")
    const base64 = commaIndex >= 0 ? fileData.slice(commaIndex + 1) : fileData

    const apiKey = process.env.GOOGLE_VISION_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing GOOGLE_VISION_API_KEY on server" }, { status: 500 })
    }

    const visionUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`

    const visionRequest = {
      requests: [
        {
          image: { content: base64 },
          features: [{ type: "TEXT_DETECTION", maxResults: 1 }],
        },
      ],
    }

    const resp = await fetch(visionUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visionRequest),
    })

    if (!resp.ok) {
      const text = await resp.text()
      return NextResponse.json({ error: "Vision API error", detail: text }, { status: 502 })
    }

    const data = await resp.json()

    const annotation = data?.responses?.[0]
    const extractedText = annotation?.fullTextAnnotation?.text || annotation?.textAnnotations?.[0]?.description || ""

    // NOTE: per recent change, we no longer attempt to auto-extract amounts from screenshots.
    // This endpoint returns OCR text only. Amount extraction/auto-fill has been disabled
    // to avoid incorrect auto-population from varied screenshot formats.
    return NextResponse.json({ text: extractedText, amount: null, isPayment: false })
  } catch (err) {
    console.error("/api/ocr/process error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
