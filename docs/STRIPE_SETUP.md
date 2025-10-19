# 💳 Stripe Payment Integration Setup Guide

## Overview

This guide will help you set up Stripe payments for your course. When a user completes payment, their `hasPaid` field in Firestore will automatically be updated to `true`.

---

## 📋 Prerequisites

- ✅ Stripe account (test mode is fine for development)
- ✅ Firebase Firestore configured
- ✅ `.env.local` file with Stripe keys

---

## Step 1: Get Your Stripe Keys

### 1.1 Go to Stripe Dashboard

Visit: https://dashboard.stripe.com/test/apikeys

### 1.2 Copy Your Keys

You should see:
- **Publishable key** (starts with `pk_test_`)
- **Secret key** (starts with `sk_test_`)

### 1.3 Add to `.env.local`

Your `.env.local` already has:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="***"
STRIPE_SECRET_KEY="***"
```

✅ **Already configured!**

---

## Step 2: Set Up Stripe Webhook

This is **CRITICAL** - the webhook updates Firestore when payment succeeds.

### 2.1 Install Stripe CLI (for local testing)

```bash
brew install stripe/stripe-cli/stripe
```

Or download from: https://stripe.com/docs/stripe-cli

### 2.2 Login to Stripe CLI

```bash
stripe login
```

### 2.3 Forward Webhooks to Local Server

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This will output a webhook signing secret like:
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

### 2.4 Add Webhook Secret to `.env.local`

Add this line to your `.env.local`:
```env
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"
```

### 2.5 Keep Stripe CLI Running

**Important:** Keep the `stripe listen` command running in a separate terminal while testing!

---

## Step 3: Configure Production Webhook (Later)

When you deploy to production:

### 3.1 Go to Stripe Dashboard

Visit: https://dashboard.stripe.com/test/webhooks

### 3.2 Add Endpoint

Click **"Add endpoint"**

**Endpoint URL:**
```
https://your-domain.com/api/stripe/webhook
```

**Events to send:**
- `checkout.session.completed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

### 3.3 Get Signing Secret

After creating the endpoint, click on it and copy the **Signing secret** (starts with `whsec_`)

### 3.4 Add to Production Environment

Add `STRIPE_WEBHOOK_SECRET` to your production environment variables (Vercel, Netlify, etc.)

---

## Step 4: Test the Payment Flow

### 4.1 Start Development Server

```bash
npm run dev
```

### 4.2 Start Stripe Webhook Listener (separate terminal)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### 4.3 Login and Navigate to Dashboard

1. Go to http://localhost:3000/login
2. Login with your account
3. Go to dashboard

### 4.4 Click "Comprar Ahora"

You should be redirected to Stripe Checkout

### 4.5 Use Test Card

Use Stripe's test card:
- **Card number:** `4242 4242 4242 4242`
- **Expiry:** Any future date (e.g., `12/34`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP:** Any 5 digits (e.g., `12345`)

### 4.6 Complete Payment

After clicking "Pay", you should:
1. See the webhook event in the Stripe CLI terminal
2. Be redirected back to dashboard
3. See "¡Curso Desbloqueado!" message
4. Have access to all course modules

### 4.7 Verify in Firestore

Go to Firebase Console → Firestore Database → users → your user document

You should see:
```javascript
{
  hasPaid: true,
  stripeCustomerId: "cus_xxxxx",
  stripeSessionId: "cs_xxxxx"
}
```

---

## 🔍 Troubleshooting

### Issue 1: "Webhook secret not configured"

**Solution:** Make sure `STRIPE_WEBHOOK_SECRET` is in `.env.local` and restart the dev server

### Issue 2: Payment succeeds but hasPaid not updated

**Solution:** 
1. Check Stripe CLI is running
2. Check webhook logs in terminal
3. Check server logs for errors

### Issue 3: "No signature" error

**Solution:** Make sure you're using `stripe listen` to forward webhooks locally

### Issue 4: Payment button not showing

**Solution:** 
1. Check user is logged in
2. Check `hasPaid` is `false` in Firestore
3. Check browser console for errors

---

## 📊 Payment Flow Diagram

```
User clicks "Comprar Ahora"
    ↓
POST /api/stripe/create-checkout-session
    ↓
Stripe Checkout page opens
    ↓
User enters card details
    ↓
Payment processed by Stripe
    ↓
Stripe sends webhook to /api/stripe/webhook
    ↓
Webhook verifies signature
    ↓
Updates Firestore: hasPaid = true
    ↓
User redirected to dashboard
    ↓
Dashboard shows "¡Curso Desbloqueado!"
```

---

## 💰 Pricing Configuration

Current price is set in `.env.local`:

```env
NEXT_PUBLIC_COURSE_PRICE="9900"  # €99.00 (in cents)
NEXT_PUBLIC_CURRENCY="EUR"
```

To change the price, update `NEXT_PUBLIC_COURSE_PRICE` (in cents):
- €49.99 = `4999`
- €99.00 = `9900`
- €149.00 = `14900`

---

## 🔐 Security Notes

1. **Never expose `STRIPE_SECRET_KEY`** - It's server-side only
2. **Verify webhook signatures** - Already implemented
3. **Use HTTPS in production** - Required by Stripe
4. **Keep webhook secret secure** - Don't commit to git

---

## 🚀 Going to Production

### Checklist:

- [ ] Switch to Stripe live mode keys
- [ ] Create production webhook endpoint
- [ ] Add `STRIPE_WEBHOOK_SECRET` to production env
- [ ] Test with real card (small amount)
- [ ] Set up Stripe Dashboard alerts
- [ ] Configure email receipts in Stripe
- [ ] Add refund policy to checkout

---

## 📝 Environment Variables Summary

Required in `.env.local`:

```env
# Stripe (already configured)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."  # Add this!

# Course pricing (already configured)
NEXT_PUBLIC_COURSE_PRICE="9900"
NEXT_PUBLIC_CURRENCY="EUR"

# App URL (optional, defaults to localhost:3000)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## ✅ Quick Test Checklist

- [ ] Stripe keys in `.env.local`
- [ ] Webhook secret in `.env.local`
- [ ] Dev server running (`npm run dev`)
- [ ] Stripe CLI running (`stripe listen --forward-to localhost:3000/api/stripe/webhook`)
- [ ] User logged in
- [ ] Click "Comprar Ahora"
- [ ] Use test card `4242 4242 4242 4242`
- [ ] Complete payment
- [ ] Check Firestore `hasPaid = true`
- [ ] Dashboard shows unlocked content

---

**Ready to test payments! 🎉**
