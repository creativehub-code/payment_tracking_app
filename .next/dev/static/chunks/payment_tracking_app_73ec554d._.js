(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/payment_tracking_app/lib/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Configuration to enable/disable Firebase
// Set to true to use Firebase, false to use localStorage
__turbopack_context__.s([
    "FIREBASE_AVAILABLE",
    ()=>FIREBASE_AVAILABLE,
    "IS_FIREBASE_ENABLED",
    ()=>IS_FIREBASE_ENABLED,
    "USE_FIREBASE",
    ()=>USE_FIREBASE
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/payment_tracking_app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const USE_FIREBASE = ("TURBOPACK compile-time value", "true") === "true";
const FIREBASE_AVAILABLE = !!(("TURBOPACK compile-time value", "AIzaSyD-JVTkO6WZNSJgFRADne_VAH23M0Wmbtc") && ("TURBOPACK compile-time value", "tracking-app-6f5ea"));
const IS_FIREBASE_ENABLED = USE_FIREBASE && FIREBASE_AVAILABLE;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/payment_tracking_app/lib/firebase/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "db",
    ()=>db,
    "default",
    ()=>__TURBOPACK__default__export__,
    "storage",
    ()=>storage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/payment_tracking_app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$firebase$2f$storage$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/firebase/storage/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/@firebase/storage/dist/index.esm.js [app-client] (ecmascript)");
;
;
;
;
// Check if Firebase config is available (not placeholder values)
const hasFirebaseConfig = !!(("TURBOPACK compile-time value", "AIzaSyD-JVTkO6WZNSJgFRADne_VAH23M0Wmbtc") && ("TURBOPACK compile-time value", "tracking-app-6f5ea") && ("TURBOPACK compile-time value", "AIzaSyD-JVTkO6WZNSJgFRADne_VAH23M0Wmbtc") !== "your_api_key_here" && ("TURBOPACK compile-time value", "tracking-app-6f5ea") !== "your-project-id" && ("TURBOPACK compile-time value", "AIzaSyD-JVTkO6WZNSJgFRADne_VAH23M0Wmbtc").trim() !== "" && ("TURBOPACK compile-time value", "tracking-app-6f5ea").trim() !== "");
const firebaseConfig = hasFirebaseConfig ? {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyD-JVTkO6WZNSJgFRADne_VAH23M0Wmbtc"),
    authDomain: ("TURBOPACK compile-time value", "tracking-app-6f5ea.firebaseapp.com"),
    projectId: ("TURBOPACK compile-time value", "tracking-app-6f5ea"),
    storageBucket: ("TURBOPACK compile-time value", "tracking-app-6f5ea.firebasestorage.app"),
    messagingSenderId: ("TURBOPACK compile-time value", "150306897882"),
    appId: ("TURBOPACK compile-time value", "1:150306897882:web:4257876b7bf53a68d84ae3")
} : null;
// Initialize Firebase only if config is available
let app = null;
let auth = null;
let db = null;
let storage = null;
if (hasFirebaseConfig && firebaseConfig) {
    try {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])().length === 0) {
            app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig);
        } else {
            app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])()[0];
        }
        // Initialize Firebase services
        auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])(app);
        db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
        storage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStorage"])(app);
    } catch (error) {
        console.error("Firebase initialization error:", error);
        // Set to null if initialization fails
        app = null;
        auth = null;
        db = null;
        storage = null;
    }
}
;
const __TURBOPACK__default__export__ = app;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/payment_tracking_app/lib/firebase/payments.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deletePayment",
    ()=>deletePayment,
    "getMonthlyAggregates",
    ()=>getMonthlyAggregates,
    "getPayment",
    ()=>getPayment,
    "getPayments",
    ()=>getPayments,
    "getPaymentsByClient",
    ()=>getPaymentsByClient,
    "getPaymentsByMonthAndClient",
    ()=>getPaymentsByMonthAndClient,
    "getPaymentsByStatus",
    ()=>getPaymentsByStatus,
    "savePayment",
    ()=>savePayment,
    "subscribeToPayments",
    ()=>subscribeToPayments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/lib/firebase/config.ts [app-client] (ecmascript)");
;
;
// Helper to check if Firebase is available
function checkFirebaseAvailable() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
        throw new Error("Firebase is not initialized. Please check your Firebase configuration in .env.local");
    }
}
const PAYMENTS_COLLECTION = "payments";
// Convert Firestore timestamp to ISO string
const timestampToISO = (timestamp)=>{
    if (timestamp?.toDate) {
        return timestamp.toDate().toISOString();
    }
    if (timestamp instanceof __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timestamp"]) {
        return timestamp.toDate().toISOString();
    }
    return timestamp || new Date().toISOString();
};
// Convert Payment to Firestore document
const paymentToFirestore = (payment)=>{
    return {
        ...payment,
        submittedAt: __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timestamp"].fromDate(new Date(payment.submittedAt)),
        reviewedAt: payment.reviewedAt ? __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timestamp"].fromDate(new Date(payment.reviewedAt)) : null,
        approvedAt: payment.approvedAt ? __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timestamp"].fromDate(new Date(payment.approvedAt)) : null
    };
};
// Convert Firestore document to Payment
const firestoreToPayment = (doc)=>{
    const data = doc.data();
    return {
        ...data,
        id: doc.id,
        submittedAt: timestampToISO(data.submittedAt),
        reviewedAt: data.reviewedAt ? timestampToISO(data.reviewedAt) : undefined,
        approvedAt: data.approvedAt ? timestampToISO(data.approvedAt) : undefined
    };
};
async function getPayments() {
    try {
        checkFirebaseAvailable();
        const paymentsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], PAYMENTS_COLLECTION);
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(paymentsRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("submittedAt", "desc"));
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return querySnapshot.docs.map(firestoreToPayment);
    } catch (error) {
        console.error("Error getting payments:", error);
        return [];
    }
}
async function getPayment(id) {
    try {
        checkFirebaseAvailable();
        const paymentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], PAYMENTS_COLLECTION, id);
        const paymentSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(paymentRef);
        if (paymentSnap.exists()) {
            return firestoreToPayment(paymentSnap);
        }
        return null;
    } catch (error) {
        console.error("Error getting payment:", error);
        return null;
    }
}
async function savePayment(payment) {
    try {
        checkFirebaseAvailable();
        if (payment.id && payment.id.startsWith("payment_")) {
            // Update existing payment
            const paymentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], PAYMENTS_COLLECTION, payment.id);
            const { id, ...paymentData } = payment;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(paymentRef, paymentToFirestore(paymentData));
        } else {
            // Create new payment
            const { id, ...paymentData } = payment;
            const newId = id || `payment_${Date.now()}`;
            const paymentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], PAYMENTS_COLLECTION, newId);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(paymentRef, {
                ...paymentToFirestore(paymentData),
                id: newId
            });
        }
    } catch (error) {
        // If update fails, try to create new document
        try {
            checkFirebaseAvailable();
            const paymentsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], PAYMENTS_COLLECTION);
            const { id, ...paymentData } = payment;
            const newId = id || `payment_${Date.now()}`;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])(paymentsRef, {
                ...paymentToFirestore(paymentData),
                id: newId
            });
        } catch (addError) {
            console.error("Error saving payment:", addError);
            throw addError;
        }
    }
}
async function deletePayment(id) {
    try {
        checkFirebaseAvailable();
        const paymentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], PAYMENTS_COLLECTION, id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])(paymentRef);
    } catch (error) {
        console.error("Error deleting payment:", error);
        throw error;
    }
}
async function getPaymentsByClient(clientId) {
    try {
        checkFirebaseAvailable();
        const paymentsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], PAYMENTS_COLLECTION);
        // Use where only (no orderBy) to avoid index requirement, then sort in memory
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(paymentsRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("clientId", "==", clientId));
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const payments = querySnapshot.docs.map(firestoreToPayment);
        // Sort by submittedAt descending in memory
        return payments.sort((a, b)=>new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    } catch (error) {
        console.error("Error getting payments by client:", error);
        // If it's an index error, try fallback method
        if (error?.code === "failed-precondition" && error?.message?.includes("index")) {
            console.warn("Index error detected, trying fallback method...");
            try {
                // Fallback: Get all payments and filter in memory
                const paymentsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], PAYMENTS_COLLECTION);
                const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(paymentsRef);
                const allPayments = querySnapshot.docs.map(firestoreToPayment);
                const filtered = allPayments.filter((p)=>p.clientId === clientId);
                return filtered.sort((a, b)=>new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
            } catch (fallbackError) {
                console.error("Fallback method also failed:", fallbackError);
            }
        }
        return [];
    }
}
async function getPaymentsByStatus(status) {
    try {
        checkFirebaseAvailable();
        const paymentsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], PAYMENTS_COLLECTION);
        // Use where only (no orderBy) to avoid index requirement, then sort in memory
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(paymentsRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("status", "==", status));
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const payments = querySnapshot.docs.map(firestoreToPayment);
        // Sort by submittedAt descending in memory
        return payments.sort((a, b)=>new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    } catch (error) {
        console.error("Error getting payments by status:", error);
        // If it's an index error, try fallback method
        if (error?.code === "failed-precondition" && error?.message?.includes("index")) {
            console.warn("Index error detected, trying fallback method...");
            try {
                // Fallback: Get all payments and filter in memory
                const paymentsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], PAYMENTS_COLLECTION);
                const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(paymentsRef);
                const allPayments = querySnapshot.docs.map(firestoreToPayment);
                const filtered = allPayments.filter((p)=>p.status === status);
                return filtered.sort((a, b)=>new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
            } catch (fallbackError) {
                console.error("Fallback method also failed:", fallbackError);
            }
        }
        return [];
    }
}
function subscribeToPayments(callback, clientId, status) {
    try {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]) {
            console.warn("Firebase not initialized, subscription disabled");
            return ()=>{};
        }
        const paymentsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], PAYMENTS_COLLECTION);
        // Build query without orderBy to avoid index requirement
        // We'll sort in memory instead
        let q;
        if (clientId && status) {
            // For multiple filters, we need to get all and filter in memory
            q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(paymentsRef);
        } else if (clientId) {
            q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(paymentsRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("clientId", "==", clientId));
        } else if (status) {
            q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(paymentsRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("status", "==", status));
        } else {
            q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(paymentsRef);
        }
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snapshot)=>{
            let payments = snapshot.docs.map(firestoreToPayment);
            // Apply filters in memory if needed
            if (clientId) {
                payments = payments.filter((p)=>p.clientId === clientId);
            }
            if (status) {
                payments = payments.filter((p)=>p.status === status);
            }
            // Sort by submittedAt descending in memory
            payments.sort((a, b)=>new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
            callback(payments);
        }, (error)=>{
            console.error("Error subscribing to payments:", error);
            // If it's an index error, try fallback: subscribe to all and filter in memory
            if (error?.code === "failed-precondition" && error?.message?.includes("index")) {
                console.warn("Index error in subscription, using fallback method...");
                const fallbackQ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(paymentsRef);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(fallbackQ, (snapshot)=>{
                    let payments = snapshot.docs.map(firestoreToPayment);
                    if (clientId) payments = payments.filter((p)=>p.clientId === clientId);
                    if (status) payments = payments.filter((p)=>p.status === status);
                    payments.sort((a, b)=>new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
                    callback(payments);
                }, (fallbackError)=>{
                    console.error("Fallback subscription also failed:", fallbackError);
                    callback([]);
                });
            }
            callback([]);
        });
        return unsubscribe;
    } catch (error) {
        console.error("Error setting up payment subscription:", error);
        return ()=>{};
    }
}
async function getMonthlyAggregates(clientId) {
    try {
        const payments = await getPaymentsByClient(clientId);
        const approvedPayments = payments.filter((p)=>p.status === "approved");
        const monthMap = new Map();
        approvedPayments.forEach((payment)=>{
            const date = new Date(payment.approvedAt || payment.submittedAt);
            const month = date.toISOString().slice(0, 7) // YYYY-MM format
            ;
            if (!monthMap.has(month)) {
                monthMap.set(month, []);
            }
            monthMap.get(month).push(payment);
        });
        return Array.from(monthMap.entries()).map(([month, monthPayments])=>({
                month,
                amount: monthPayments.reduce((sum, p)=>sum + p.amount, 0),
                payments: monthPayments
            })).sort((a, b)=>a.month.localeCompare(b.month));
    } catch (error) {
        console.error("Error getting monthly aggregates:", error);
        return [];
    }
}
async function getPaymentsByMonthAndClient(clientId, month) {
    try {
        const payments = await getPaymentsByClient(clientId);
        return payments.filter((p)=>p.status === "approved").filter((p)=>{
            const date = new Date(p.approvedAt || p.submittedAt);
            return date.toISOString().slice(0, 7) === month;
        });
    } catch (error) {
        console.error("Error getting payments by month and client:", error);
        return [];
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/payment_tracking_app/lib/payment-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deletePayment",
    ()=>deletePayment,
    "getClientByPayment",
    ()=>getClientByPayment,
    "getClientSummary",
    ()=>getClientSummary,
    "getClientSummarySync",
    ()=>getClientSummarySync,
    "getClientsStore",
    ()=>getClientsStore,
    "getMonthlyAggregates",
    ()=>getMonthlyAggregates,
    "getMonthlyAggregatesSync",
    ()=>getMonthlyAggregatesSync,
    "getPayments",
    ()=>getPayments,
    "getPaymentsByClient",
    ()=>getPaymentsByClient,
    "getPaymentsByClientSync",
    ()=>getPaymentsByClientSync,
    "getPaymentsByMonthAndClient",
    ()=>getPaymentsByMonthAndClient,
    "getPaymentsByStatus",
    ()=>getPaymentsByStatus,
    "getPaymentsSync",
    ()=>getPaymentsSync,
    "savePayment",
    ()=>savePayment,
    "subscribeToPayments",
    ()=>subscribeToPayments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/lib/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$payments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/lib/firebase/payments.ts [app-client] (ecmascript)");
;
;
const STORAGE_KEY = "paymentTracker_payments";
const CLIENTS_STORAGE_KEY = "paymentTracker_clients";
// localStorage implementations
function getPaymentsLocal() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}
function savePaymentLocal(payment) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const payments = getPaymentsLocal();
    const existing = payments.findIndex((p)=>p.id === payment.id);
    if (existing >= 0) {
        payments[existing] = payment;
    } else {
        payments.push(payment);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
}
function deletePaymentLocal(id) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const payments = getPaymentsLocal().filter((p)=>p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
}
async function getPayments() {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IS_FIREBASE_ENABLED"]) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$payments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPayments"]();
    }
    return getPaymentsLocal();
}
function getPaymentsSync() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IS_FIREBASE_ENABLED"]) {
        return getPaymentsLocal();
    }
    return [] // Firebase is async, so return empty for sync calls
    ;
}
async function savePayment(payment) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IS_FIREBASE_ENABLED"]) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$payments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savePayment"](payment);
    } else {
        savePaymentLocal(payment);
    }
}
async function deletePayment(id) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IS_FIREBASE_ENABLED"]) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$payments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deletePayment"](id);
    } else {
        deletePaymentLocal(id);
    }
}
async function getPaymentsByClient(clientId) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IS_FIREBASE_ENABLED"]) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$payments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaymentsByClient"](clientId);
    }
    return getPaymentsLocal().filter((p)=>p.clientId === clientId);
}
function getPaymentsByClientSync(clientId) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IS_FIREBASE_ENABLED"]) {
        return getPaymentsLocal().filter((p)=>p.clientId === clientId);
    }
    return [];
}
async function getPaymentsByStatus(status) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IS_FIREBASE_ENABLED"]) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$payments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaymentsByStatus"](status);
    }
    return getPaymentsLocal().filter((p)=>p.status === status);
}
function getClientByPayment(payment) {
    const stored = localStorage.getItem(CLIENTS_STORAGE_KEY);
    if (!stored) {
        // Generate a default client
        return {
            id: payment.clientId,
            name: `Client ${payment.clientId.slice(0, 8)}`,
            targetAmount: 10000
        };
    }
    const clients = JSON.parse(stored);
    return clients.find((c)=>c.id === payment.clientId) || null;
}
function getClientsStore() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(CLIENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}
async function getMonthlyAggregates(clientId) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IS_FIREBASE_ENABLED"]) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$payments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMonthlyAggregates"](clientId);
    }
    const payments = await getPaymentsByClient(clientId);
    const approvedPayments = payments.filter((p)=>p.status === "approved");
    const monthMap = new Map();
    approvedPayments.forEach((payment)=>{
        const date = new Date(payment.approvedAt || payment.submittedAt);
        const month = date.toISOString().slice(0, 7) // YYYY-MM format
        ;
        if (!monthMap.has(month)) {
            monthMap.set(month, []);
        }
        monthMap.get(month).push(payment);
    });
    return Array.from(monthMap.entries()).map(([month, monthPayments])=>({
            month,
            amount: monthPayments.reduce((sum, p)=>sum + p.amount, 0),
            payments: monthPayments
        })).sort((a, b)=>a.month.localeCompare(b.month));
}
function getMonthlyAggregatesSync(clientId) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IS_FIREBASE_ENABLED"]) {
        return [] // Firebase is async
        ;
    }
    const payments = getPaymentsByClientSync(clientId).filter((p)=>p.status === "approved");
    const monthMap = new Map();
    payments.forEach((payment)=>{
        const date = new Date(payment.approvedAt || payment.submittedAt);
        const month = date.toISOString().slice(0, 7);
        if (!monthMap.has(month)) {
            monthMap.set(month, []);
        }
        monthMap.get(month).push(payment);
    });
    return Array.from(monthMap.entries()).map(([month, monthPayments])=>({
            month,
            amount: monthPayments.reduce((sum, p)=>sum + p.amount, 0),
            payments: monthPayments
        })).sort((a, b)=>a.month.localeCompare(b.month));
}
async function getClientSummary(clientId) {
    const client = getClientByPayment({
        clientId
    }) || {
        id: clientId,
        name: "Unknown",
        targetAmount: 10000
    };
    const payments = await getPaymentsByClient(clientId);
    const approvedPayments = payments.filter((p)=>p.status === "approved");
    const totalApproved = approvedPayments.reduce((sum, p)=>sum + p.amount, 0);
    const monthlyData = await getMonthlyAggregates(clientId);
    let cumulativeTotal = 0;
    let targetReachedMonth;
    for (const monthly of monthlyData){
        cumulativeTotal += monthly.amount;
        if (cumulativeTotal >= client.targetAmount && !targetReachedMonth) {
            targetReachedMonth = monthly.month;
        }
    }
    return {
        targetAmount: client.targetAmount,
        totalApproved,
        remaining: Math.max(0, client.targetAmount - totalApproved),
        targetReachedMonth
    };
}
function getClientSummarySync(clientId) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IS_FIREBASE_ENABLED"]) {
        // Return default values if Firebase is enabled (async version should be used)
        return {
            targetAmount: 0,
            totalApproved: 0,
            remaining: 0
        };
    }
    const client = getClientByPayment({
        clientId
    }) || {
        id: clientId,
        name: "Unknown",
        targetAmount: 10000
    };
    const payments = getPaymentsByClientSync(clientId).filter((p)=>p.status === "approved");
    const totalApproved = payments.reduce((sum, p)=>sum + p.amount, 0);
    const monthlyData = getMonthlyAggregatesSync(clientId);
    let cumulativeTotal = 0;
    let targetReachedMonth;
    for (const monthly of monthlyData){
        cumulativeTotal += monthly.amount;
        if (cumulativeTotal >= client.targetAmount && !targetReachedMonth) {
            targetReachedMonth = monthly.month;
        }
    }
    return {
        targetAmount: client.targetAmount,
        totalApproved,
        remaining: Math.max(0, client.targetAmount - totalApproved),
        targetReachedMonth
    };
}
async function getPaymentsByMonthAndClient(clientId, month) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IS_FIREBASE_ENABLED"]) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$payments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaymentsByMonthAndClient"](clientId, month);
    }
    const payments = await getPaymentsByClient(clientId);
    return payments.filter((p)=>p.status === "approved").filter((p)=>{
        const date = new Date(p.approvedAt || p.submittedAt);
        return date.toISOString().slice(0, 7) === month;
    });
}
function subscribeToPayments(callback, clientId, status) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IS_FIREBASE_ENABLED"]) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$firebase$2f$payments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeToPayments"](callback, clientId, status);
    }
    // For localStorage, just call callback with current data
    getPayments().then((payments)=>{
        let filtered = payments;
        if (clientId) filtered = filtered.filter((p)=>p.clientId === clientId);
        if (status) filtered = filtered.filter((p)=>p.status === status);
        callback(filtered);
    });
    return ()=>{} // Return empty unsubscribe function
    ;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/payment_tracking_app/lib/ocr-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractAmountFromText",
    ()=>extractAmountFromText,
    "processPaymentProof",
    ()=>processPaymentProof
]);
function extractAmountFromText(text) {
    const patterns = [
        /₹\s*(\d+(?:[,]\d{3})*(?:[.]\d{2})?)/gi,
        /(\d+(?:[,]\d{3})*(?:[.]\d{2}))\s*(?:INR|rupees?|₹)/gi,
        /total[:\s]+₹?\s*(\d+(?:[,]\d{3})*(?:[.]\d{2})?)/gi,
        /amount[:\s]+₹?\s*(\d+(?:[,]\d{3})*(?:[.]\d{2})?)/gi,
        /price[:\s]+₹?\s*(\d+(?:[,]\d{3})*(?:[.]\d{2})?)/gi,
        /payment[:\s]+₹?\s*(\d+(?:[,]\d{3})*(?:[.]\d{2})?)/gi
    ];
    for (const pattern of patterns){
        const matches = text.matchAll(pattern);
        for (const match of matches){
            if (match[1]) {
                // Extract the captured group (the number part)
                let numberStr = match[1];
                // Remove commas (Indian number format: 1,250.00)
                numberStr = numberStr.replace(/,/g, "");
                // Parse as float
                const amount = Number.parseFloat(numberStr);
                if (!isNaN(amount) && amount > 0) {
                    return amount;
                }
            }
        }
    }
    // Fallback: try to find any number with currency symbol
    const fallbackPattern = /₹\s*([\d,]+(?:\.\d{2})?)/gi;
    const fallbackMatch = text.match(fallbackPattern);
    if (fallbackMatch) {
        let numberStr = fallbackMatch[0].replace(/₹\s*/gi, "").replace(/,/g, "");
        const amount = Number.parseFloat(numberStr);
        if (!isNaN(amount) && amount > 0) {
            return amount;
        }
    }
    return null;
}
async function processPaymentProof(fileData) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const mockText = "Invoice Date: 2025-01-15\nTotal Amount: ₹1,250.00\nDescription: Equipment payment";
            const amount = extractAmountFromText(mockText);
            resolve({
                text: mockText,
                amount
            });
        }, 1000);
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/payment_tracking_app/components/client/payment-submission-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PaymentSubmissionForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$ocr$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/lib/ocr-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/lib/auth-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$payment$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/lib/payment-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function PaymentSubmissionForm({ onSubmit }) {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        amount: "",
        description: "payment"
    });
    const [fileName, setFileName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [fileData, setFileData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isProcessingOCR, setIsProcessingOCR] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ocrResult, setOcrResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleFileChange = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = async (event)=>{
                const result = event.target?.result;
                setFileData(result);
                setIsProcessingOCR(true);
                try {
                    const ocr = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$ocr$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processPaymentProof"])(result);
                    setOcrResult(ocr);
                    if (ocr.amount && !formData.amount) {
                        setFormData((prev)=>({
                                ...prev,
                                amount: ocr.amount.toString()
                            }));
                    }
                } catch (error) {
                    console.error("[v0] OCR processing error:", error);
                } finally{
                    setIsProcessingOCR(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!user?.id || !formData.amount || !formData.description) {
            alert("Please fill in all fields");
            return;
        }
        setIsSubmitting(true);
        try {
            const payment = {
                id: `payment_${Date.now()}`,
                clientId: user.id,
                amount: Number.parseFloat(formData.amount),
                description: formData.description,
                proofUrl: fileData || undefined,
                ocrAmount: ocrResult?.amount || undefined,
                status: "pending",
                submittedAt: new Date().toISOString()
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$payment$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savePayment"])(payment);
            setFormData({
                amount: "",
                description: "payment"
            });
            setFileName("");
            setFileData("");
            setOcrResult(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            onSubmit();
            alert("Payment submitted successfully!");
        } catch (error) {
            console.error("[v0] Error submitting payment:", error);
            alert("Failed to submit payment");
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "space-y-4 bg-muted-background/30 border border-muted/30 rounded p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold text-foreground",
                children: "Submit Payment Proof"
            }, void 0, false, {
                fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm font-medium text-foreground mb-2",
                        children: "Amount"
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        step: "0.01",
                        min: "0",
                        value: formData.amount,
                        onChange: (e)=>setFormData({
                                ...formData,
                                amount: e.target.value
                            }),
                        placeholder: "0.00",
                        className: "w-full px-3 py-2 rounded",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    ocrResult?.amount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted mt-1",
                        children: [
                            "OCR detected: ₹",
                            ocrResult.amount.toLocaleString("en-IN")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm font-medium text-foreground mb-2",
                        children: "Description"
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: formData.description,
                        onChange: (e)=>setFormData({
                                ...formData,
                                description: e.target.value
                            }),
                        placeholder: "e.g., Invoice payment, Equipment purchase",
                        className: "w-full px-3 py-2 rounded resize-none h-20",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm font-medium text-foreground mb-2",
                        children: "Proof Document"
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: fileInputRef,
                                type: "file",
                                onChange: handleFileChange,
                                accept: "image/*,.pdf",
                                className: "hidden"
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>fileInputRef.current?.click(),
                                className: "px-4 py-2 rounded bg-muted-background border border-muted hover:bg-muted-background/80 text-foreground text-sm",
                                children: "Choose File"
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            fileName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-muted",
                                children: fileName
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                                lineNumber: 144,
                                columnNumber: 24
                            }, this),
                            isProcessingOCR && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-primary animate-pulse",
                                children: "Processing with OCR..."
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                                lineNumber: 145,
                                columnNumber: 31
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                disabled: isSubmitting,
                className: "w-full py-2 px-4 rounded bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 transition-opacity",
                children: isSubmitting ? "Submitting..." : "Submit Payment"
            }, void 0, false, {
                fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/payment_tracking_app/components/client/payment-submission-form.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_s(PaymentSubmissionForm, "+YXZ7tU+YC+IgmcX+0j37gQfzZk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = PaymentSubmissionForm;
var _c;
__turbopack_context__.k.register(_c, "PaymentSubmissionForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/payment_tracking_app/components/client/payment-history-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PaymentHistoryCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function PaymentHistoryCard({ payment }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-muted/30 rounded p-4 bg-muted-background/30 space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-semibold text-foreground",
                                children: [
                                    "$",
                                    payment.amount.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                                lineNumber: 14,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted",
                                children: payment.description
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                                lineNumber: 15,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `px-3 py-1 rounded text-sm font-medium whitespace-nowrap ${payment.status === "pending" ? "bg-warning/20 text-warning" : payment.status === "approved" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`,
                        children: payment.status.charAt(0).toUpperCase() + payment.status.slice(1)
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-4 text-sm pt-2 border-t border-muted/30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted mb-1",
                                children: "Submitted"
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-foreground",
                                children: new Date(payment.submittedAt).toLocaleDateString()
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    payment.reviewedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted mb-1",
                                children: "Reviewed"
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                                lineNumber: 37,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-foreground",
                                children: new Date(payment.reviewedAt).toLocaleDateString()
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            payment.adminNotes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-background/50 border border-muted/30 rounded p-3 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted mb-1",
                        children: "Admin Notes"
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-foreground",
                        children: payment.adminNotes
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this),
            payment.proofUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: payment.proofUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-primary hover:underline text-sm inline-block",
                children: "View Proof Document"
            }, void 0, false, {
                fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
                lineNumber: 51,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/payment_tracking_app/components/client/payment-history-card.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = PaymentHistoryCard;
var _c;
__turbopack_context__.k.register(_c, "PaymentHistoryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/payment_tracking_app/components/client/monthly-progress-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MonthlyProgressCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function MonthlyProgressCard({ summary, monthlyData, targetAmount }) {
    _s();
    const [selectedMonth, setSelectedMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedPayments = selectedMonth ? monthlyData.find((m)=>m.month === selectedMonth)?.payments || [] : [];
    const chartData = monthlyData.map((m)=>({
            month: new Date(m.month + "-01").toLocaleDateString("en-US", {
                month: "short",
                year: "numeric"
            }),
            amount: m.amount,
            monthKey: m.month
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            chartData.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border border-muted/30 rounded p-4 bg-muted-background/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-sm font-semibold text-foreground mb-4",
                        children: "Monthly Breakdown"
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        width: "100%",
                        height: 250,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                            data: chartData,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                    strokeDasharray: "3 3",
                                    stroke: "var(--color-muted)"
                                }, void 0, false, {
                                    fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                                    lineNumber: 31,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                    dataKey: "month",
                                    stroke: "var(--color-muted)",
                                    fontSize: 12
                                }, void 0, false, {
                                    fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                                    lineNumber: 32,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                    stroke: "var(--color-muted)",
                                    fontSize: 12
                                }, void 0, false, {
                                    fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                                    lineNumber: 33,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    contentStyle: {
                                        backgroundColor: "var(--color-background)",
                                        border: "1px solid var(--color-muted)",
                                        borderRadius: "8px"
                                    },
                                    formatter: (value)=>`₹${value.toLocaleString()}`
                                }, void 0, false, {
                                    fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                    dataKey: "amount",
                                    fill: "var(--color-primary)",
                                    onClick: (data)=>setSelectedMonth(data.payload.monthKey),
                                    cursor: "pointer"
                                }, void 0, false, {
                                    fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                                    lineNumber: 42,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                            lineNumber: 30,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted mt-2",
                        children: "Click a bar to view payments for that month"
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-8 bg-muted-background/10 rounded border border-muted/30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted",
                    children: "No approved payments yet"
                }, void 0, false, {
                    fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this),
            selectedMonth && selectedPayments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border border-muted/30 rounded p-4 bg-muted-background/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-sm font-semibold text-foreground mb-4",
                        children: [
                            "Payments for",
                            " ",
                            new Date(selectedMonth + "-01").toLocaleDateString("en-US", {
                                month: "long",
                                year: "numeric"
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 max-h-64 overflow-y-auto",
                        children: selectedPayments.map((payment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-background border border-muted/30 rounded p-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-semibold text-foreground",
                                                    children: [
                                                        "₹",
                                                        payment.amount.toLocaleString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted",
                                                    children: new Date(payment.approvedAt || payment.submittedAt).toLocaleString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                                                    lineNumber: 71,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                                            lineNumber: 69,
                                            columnNumber: 19
                                        }, this),
                                        payment.proofUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: payment.proofUrl,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "text-primary hover:underline text-xs",
                                            children: "View"
                                        }, void 0, false, {
                                            fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                                            lineNumber: 81,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                                    lineNumber: 68,
                                    columnNumber: 17
                                }, this)
                            }, payment.id, false, {
                                fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/payment_tracking_app/components/client/monthly-progress-card.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(MonthlyProgressCard, "hoFjnwoLQyg7+aZRrQTuUTWykW4=");
_c = MonthlyProgressCard;
var _c;
__turbopack_context__.k.register(_c, "MonthlyProgressCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/payment_tracking_app/app/client/portal/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientPortal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/lib/auth-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$payment$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/lib/payment-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$components$2f$client$2f$payment$2d$submission$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/components/client/payment-submission-form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$components$2f$client$2f$payment$2d$history$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/components/client/payment-history-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$components$2f$client$2f$monthly$2d$progress$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/payment_tracking_app/components/client/monthly-progress-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$indian$2d$rupee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IndianRupee$3e$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/lucide-react/dist/esm/icons/indian-rupee.js [app-client] (ecmascript) <export default as IndianRupee>");
var __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/payment_tracking_app/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDown>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function ClientPortal() {
    _s();
    const { user, getClientById } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [payments, setPayments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [clientInfo, setClientInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [monthlyData, setMonthlyData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientPortal.useEffect": ()=>{
            if (user?.id) {
                const loadData = {
                    "ClientPortal.useEffect.loadData": async ()=>{
                        const [clientPayments, monthly] = await Promise.all([
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$payment$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaymentsByClient"])(user.id),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$payment$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMonthlyAggregates"])(user.id)
                        ]);
                        setPayments(clientPayments);
                        setMonthlyData(monthly);
                        const client = getClientById(user.id);
                        if (client) {
                            setClientInfo({
                                targetAmount: client.targetAmount,
                                remainingAmount: client.remainingAmount
                            });
                        }
                    }
                }["ClientPortal.useEffect.loadData"];
                loadData();
                const interval = setInterval({
                    "ClientPortal.useEffect.interval": async ()=>{
                        const [clientPayments, monthly] = await Promise.all([
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$payment$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaymentsByClient"])(user.id),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$payment$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMonthlyAggregates"])(user.id)
                        ]);
                        setPayments(clientPayments);
                        setMonthlyData(monthly);
                        const updatedClient = getClientById(user.id);
                        if (updatedClient) {
                            setClientInfo({
                                targetAmount: updatedClient.targetAmount,
                                remainingAmount: updatedClient.remainingAmount
                            });
                        }
                    }
                }["ClientPortal.useEffect.interval"], 2000);
                return ({
                    "ClientPortal.useEffect": ()=>clearInterval(interval)
                })["ClientPortal.useEffect"];
            }
        }
    }["ClientPortal.useEffect"], [
        user?.id,
        getClientById
    ]);
    const stats = {
        pending: payments.filter((p)=>p.status === "pending").length,
        approved: payments.filter((p)=>p.status === "approved").length,
        rejected: payments.filter((p)=>p.status === "rejected").length
    };
    const approvedTotal = payments.filter((p)=>p.status === "approved").reduce((sum, p)=>sum + p.amount, 0);
    const summary = clientInfo ? {
        targetAmount: clientInfo.targetAmount,
        totalApproved: approvedTotal,
        remaining: clientInfo.remainingAmount
    } : {
        targetAmount: 10000,
        totalApproved: 0,
        remaining: 10000
    };
    const progressPercent = clientInfo && clientInfo.targetAmount > 0 ? Math.min(100, (clientInfo.targetAmount - clientInfo.remainingAmount) / clientInfo.targetAmount * 100) : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 max-w-full sm:max-w-4xl mx-auto px-4 sm:px-0 min-h-screen sm:min-h-0",
        children: [
            clientInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-lg p-4 sm:p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                className: "h-4 w-4 sm:h-5 sm:w-5 text-primary"
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            "Payment Target"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-background/50 rounded-lg p-2 sm:p-4 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] sm:text-sm text-muted mb-1",
                                        children: "Total Target"
                                    }, void 0, false, {
                                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm sm:text-2xl font-bold text-primary flex items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$indian$2d$rupee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IndianRupee$3e$__["IndianRupee"], {
                                                className: "h-3 w-3 sm:h-5 sm:w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                                lineNumber: 92,
                                                columnNumber: 17
                                            }, this),
                                            clientInfo.targetAmount.toLocaleString("en-IN")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-background/50 rounded-lg p-2 sm:p-4 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] sm:text-sm text-muted mb-1",
                                        children: "Paid"
                                    }, void 0, false, {
                                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm sm:text-2xl font-bold text-green-500 flex items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$indian$2d$rupee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IndianRupee$3e$__["IndianRupee"], {
                                                className: "h-3 w-3 sm:h-5 sm:w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                                lineNumber: 99,
                                                columnNumber: 17
                                            }, this),
                                            (clientInfo.targetAmount - clientInfo.remainingAmount).toLocaleString("en-IN")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-background/50 rounded-lg p-2 sm:p-4 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] sm:text-sm text-muted mb-1 flex items-center justify-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                                lineNumber: 105,
                                                columnNumber: 17
                                            }, this),
                                            "Remaining"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm sm:text-2xl font-bold text-yellow-500 flex items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$indian$2d$rupee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IndianRupee$3e$__["IndianRupee"], {
                                                className: "h-3 w-3 sm:h-5 sm:w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                                lineNumber: 109,
                                                columnNumber: 17
                                            }, this),
                                            clientInfo.remainingAmount.toLocaleString("en-IN")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1 sm:space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-[10px] sm:text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Progress"
                                    }, void 0, false, {
                                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-foreground font-medium",
                                        children: [
                                            progressPercent.toFixed(1),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-2 sm:h-3 bg-background/50 rounded-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full bg-gradient-to-r from-primary to-green-500 rounded-full transition-all duration-500",
                                    style: {
                                        width: `${progressPercent}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                    lineNumber: 120,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                        lineNumber: 114,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-muted-background/30 border border-muted/30 rounded p-2 sm:p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] sm:text-sm text-muted mb-1",
                                children: "Total Submitted"
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl sm:text-3xl font-bold text-foreground",
                                children: payments.length
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-warning/10 border border-muted/30 rounded p-2 sm:p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] sm:text-sm text-muted mb-1",
                                children: "Pending"
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl sm:text-3xl font-bold text-warning",
                                children: stats.pending
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-success/10 border border-muted/30 rounded p-2 sm:p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] sm:text-sm text-muted mb-1",
                                children: "Approved"
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl sm:text-3xl font-bold text-success",
                                children: [
                                    "₹",
                                    approvedTotal.toLocaleString("en-IN")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-destructive/10 border border-muted/30 rounded p-2 sm:p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] sm:text-sm text-muted mb-1",
                                children: "Rejected"
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl sm:text-3xl font-bold text-destructive",
                                children: stats.rejected
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$components$2f$client$2f$monthly$2d$progress$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                summary: summary,
                monthlyData: monthlyData,
                targetAmount: summary.targetAmount
            }, void 0, false, {
                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-primary/10 border border-primary/20 rounded p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted",
                        children: "How to submit a payment:"
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "text-sm text-foreground mt-2 space-y-1 ml-4 list-disc",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Fill in the payment details and amount"
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Attach a proof document (receipt, invoice, screenshot)"
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Submit for review - our OCR system will verify the amount"
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "Wait for admin approval"
                            }, void 0, false, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$components$2f$client$2f$payment$2d$submission$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onSubmit: async ()=>{
                    const clientPayments = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$payment$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaymentsByClient"])(user.id);
                    setPayments(clientPayments);
                }
            }, void 0, false, {
                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-foreground",
                        children: "Payment History"
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    payments.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-4",
                        children: payments.map((payment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$components$2f$client$2f$payment$2d$history$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                payment: payment
                            }, payment.id, false, {
                                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                                lineNumber: 172,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                        lineNumber: 170,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-12 bg-muted-background rounded border border-muted/30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted",
                            children: "No payments submitted yet"
                        }, void 0, false, {
                            fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                            lineNumber: 177,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/payment_tracking_app/app/client/portal/page.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
_s(ClientPortal, "VavTnlY1vjM+cBV7nGA5PIcdm5s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$payment_tracking_app$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = ClientPortal;
var _c;
__turbopack_context__.k.register(_c, "ClientPortal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=payment_tracking_app_73ec554d._.js.map