import type { NextRequest } from "next/server"

// Server-side admin endpoint to create a Firebase Auth user and clients/{uid} doc
// Protects access by verifying the caller's Firebase ID token and requiring `admin:true` custom claim.

import admin from "firebase-admin"

// Initialize admin SDK lazily
function initAdmin() {
  if (!admin.apps.length) {
    // Prefer service account JSON from env var FIREBASE_SERVICE_ACCOUNT (stringified JSON)
    const svc = process.env.FIREBASE_SERVICE_ACCOUNT
    let credentials: any | null = null
    if (svc) {
      try {
        credentials = JSON.parse(svc)
      } catch (e) {
        console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT env var", e)
      }
    }

    // Fallback: attempt to load service-account.json from repo root
    if (!credentials) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        credentials = require(process.cwd() + "/service-account.json")
      } catch (e) {
        // ignore
      }
    }

    if (!credentials) {
      console.error("Firebase Admin credentials not provided. Set FIREBASE_SERVICE_ACCOUNT or provide service-account.json in repo root.")
    }

    try {
      if (credentials) {
        admin.initializeApp({ credential: admin.credential.cert(credentials) })
      } else {
        // Attempt default initialization (will work if running in GCP with proper metadata)
        admin.initializeApp()
      }
    } catch (e) {
      console.error("Failed to initialize firebase-admin:", e)
    }
  }
}

export async function POST(req: NextRequest) {
  initAdmin()

  if (!admin.apps.length) {
    return new Response(JSON.stringify({ error: "Server not configured with service account" }), { status: 500 })
  }

  try {
    const authHeader = req.headers.get("authorization") || ""
    const match = authHeader.match(/^Bearer\s+(.+)$/i)
    if (!match) {
      return new Response(JSON.stringify({ error: "Missing Authorization Bearer token" }), { status: 401 })
    }
    const idToken = match[1]

    // Verify the token and check admin claim
    const decoded = await admin.auth().verifyIdToken(idToken)
    if (!decoded || !decoded.admin) {
      return new Response(JSON.stringify({ error: "Unauthorized: admin claim required" }), { status: 403 })
    }

    const body = await req.json()
    const { email, password, name, targetAmount, makeAdmin } = body || {}

    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: "Missing required fields: email, password, name" }), { status: 400 })
    }

    // If user already exists by email, return existing uid (and update clients doc)
    let userRecord: admin.auth.UserRecord | null = null
    try {
      userRecord = await admin.auth().getUserByEmail(email)
    } catch (e: any) {
      // user not found -> create
      if (e?.code === "auth/user-not-found" || e?.code === "auth/user-not-found") {
        userRecord = await admin.auth().createUser({ email, password, displayName: name })
      } else {
        // other errors
        throw e
      }
    }

    const uid = userRecord.uid

    // Optionally set admin claim for created user
    if (makeAdmin) {
      await admin.auth().setCustomUserClaims(uid, { admin: true })
    }

    // Create/merge the clients/{uid} doc in Firestore
    const firestore = admin.firestore()

    const clientDoc = firestore.collection("clients").doc(uid)
    await clientDoc.set(
      {
        id: uid,
        email,
        name,
        targetAmount: typeof targetAmount === "number" ? targetAmount : 0,
        remainingAmount: typeof targetAmount === "number" ? targetAmount : 0,
        createdBy: decoded.uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    )

    return new Response(JSON.stringify({ ok: true, uid, email }), { status: 201 })
  } catch (err: any) {
    console.error("create-client error:", err)
    return new Response(JSON.stringify({ error: String(err?.message || err) }), { status: 500 })
  }
}
