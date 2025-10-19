# 📧 Firebase Email Templates Setup Guide

## Overview

This folder contains custom HTML email templates for Firebase Authentication:

- **email-verification.html** - Email verification template
- **password-reset.html** - Password reset template

---

## 🎨 Templates Included

### 1. Email Verification Template
- Professional design with your brand colors (indigo/blue)
- Clear call-to-action button
- Alternative link for accessibility
- Security notice
- Fully responsive
- Spanish language

### 2. Password Reset Template
- Similar design to verification email
- Security warnings
- Expiration notice
- Alternative link option
- Spanish language

---

## 📝 How to Set Up in Firebase Console

### Method 1: Using Firebase Console (Recommended)

Unfortunately, Firebase doesn't support custom HTML templates directly through the console for Authentication emails. However, you have these options:

#### Option A: Use Firebase Extensions (Email Customization)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `miprimertrabajocorporate`
3. Click **Extensions** in the left sidebar
4. Search for "Trigger Email"
5. Install the **Trigger Email** extension
6. Configure with your SMTP provider (SendGrid, Mailgun, etc.)
7. Use the custom templates provided

#### Option B: Use Cloud Functions (Advanced)

Create a Cloud Function that sends custom emails when users register or request password reset.

---

## 🚀 Quick Setup with Cloud Functions

### Step 1: Install Dependencies

```bash
cd functions
npm install nodemailer
```

### Step 2: Create Email Service

I can help you create a Cloud Function that uses these templates. Would you like me to set that up?

---

## 🎯 Simplified Approach (For Now)

Since custom HTML templates require additional setup, here's what I recommend:

### For Email Verification:

**Option 1: Use Firebase Default Templates**
1. Go to Firebase Console → Authentication → Templates
2. Customize the default templates with your:
   - App name: "Mi Primer Trabajo Corporate"
   - Sender name: Your name or company
   - Reply-to email: Your support email

**Option 2: Customize Action URL**
1. Set up a custom domain for email links
2. Create a landing page that uses your branding
3. Configure in Firebase Console → Authentication → Templates → Customize domain

---

## 📋 Firebase Console Template Customization

### Step-by-Step:

1. **Go to Firebase Console**
   - Navigate to: https://console.firebase.google.com/
   - Select: `miprimertrabajocorporate`

2. **Open Authentication Templates**
   - Click **Authentication** in left sidebar
   - Click **Templates** tab at the top
   - You'll see:
     - Email address verification
     - Password reset
     - Email address change
     - SMS verification

3. **Customize Email Verification Template**
   - Click the **pencil icon** next to "Email address verification"
   - Edit the following fields:

   **Sender name:**
   ```
   Mi Primer Trabajo Corporate
   ```

   **Sender email:**
   ```
   noreply@miprimertrabajocorporate.firebaseapp.com
   ```
   (or use your custom domain if you have one)

   **Reply-to email:**
   ```
   support@yourdomain.com
   ```
   (your actual support email)

   **Subject:**
   ```
   Verifica tu correo electrónico - Mi Primer Trabajo Corporate
   ```

   **Body (Spanish version):**
   ```
   Hola %DISPLAY_NAME%,

   Gracias por registrarte en Mi Primer Trabajo Corporate.

   Para completar tu registro y acceder a todo el contenido del curso, 
   verifica tu dirección de correo electrónico haciendo clic en el siguiente enlace:

   %LINK%

   Si no creaste una cuenta en Mi Primer Trabajo Corporate, 
   puedes ignorar este correo de forma segura.

   Este enlace expirará en 24 horas.

   ¡Nos vemos pronto!
   El equipo de Mi Primer Trabajo Corporate
   ```

4. **Customize Password Reset Template**
   - Click the **pencil icon** next to "Password reset"
   - Edit the following fields:

   **Subject:**
   ```
   Restablece tu contraseña - Mi Primer Trabajo Corporate
   ```

   **Body (Spanish version):**
   ```
   Hola %DISPLAY_NAME%,

   Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.

   Para crear una nueva contraseña, haz clic en el siguiente enlace:

   %LINK%

   Si no solicitaste este cambio, ignora este correo. 
   Tu contraseña actual no ha cambiado.

   Este enlace expirará en 1 hora por motivos de seguridad.

   Saludos,
   El equipo de Mi Primer Trabajo Corporate
   ```

5. **Save Changes**
   - Click **Save** for each template

---

## 🎨 For Full HTML Templates (Advanced)

If you want to use the beautiful HTML templates I created, you'll need to:

### Option 1: Use Trigger Email Extension

1. Install **Trigger Email** extension from Firebase Extensions
2. Configure with an email provider (SendGrid, Mailgun, etc.)
3. Upload the HTML templates
4. Configure triggers for auth events

### Option 2: Use Cloud Functions

I can create Cloud Functions that:
- Listen for new user registrations
- Send custom HTML emails using the templates
- Handle password reset requests
- Use your preferred email service (SendGrid, etc.)

**Would you like me to set this up?**

---

## 📧 Email Service Providers

For custom HTML emails, you'll need an email service:

### Recommended Options:

**SendGrid (Free tier: 100 emails/day)**
- Easy to integrate
- Good deliverability
- Free tier sufficient for starting

**Mailgun (Free tier: 5,000 emails/month)**
- Developer-friendly
- Good documentation
- Generous free tier

**AWS SES (Very cheap)**
- $0.10 per 1,000 emails
- Requires AWS account
- Best for high volume

---

## 🔧 Variables Available in Templates

Firebase provides these variables you can use:

- `%DISPLAY_NAME%` - User's display name
- `%EMAIL%` - User's email address
- `%LINK%` - Verification/reset link
- `%APP_NAME%` - Your app name

---

## ✅ What to Do Now

### Quick Start (5 minutes):
1. Go to Firebase Console → Authentication → Templates
2. Customize the text templates as shown above
3. Save changes
4. Test by registering a new user

### Advanced Setup (30 minutes):
1. Choose an email service provider
2. Install Trigger Email extension
3. Upload HTML templates
4. Configure and test

---

## 🧪 Testing Your Email Templates

### Test Email Verification:

```javascript
// In your app, after user registers:
import { sendEmailVerification } from "firebase/auth";

const user = auth.currentUser;
if (user) {
  await sendEmailVerification(user);
}
```

### Test Password Reset:

```javascript
// In your app:
import { sendPasswordResetEmail } from "firebase/auth";

await sendPasswordResetEmail(auth, "user@example.com");
```

---

## 📝 Next Steps

1. **For now**: Use the customized text templates in Firebase Console
2. **Later**: Set up HTML templates with an email service provider
3. **Future**: Add email verification to your registration flow

---

## 💡 Tips

- Start with Firebase's default templates (customized text)
- Add HTML templates later when you have more users
- Test emails with your own email address first
- Check spam folder if emails don't arrive
- Use a custom domain for better deliverability

---

## 🆘 Need Help?

If you want to implement the full HTML email templates with Cloud Functions or an email service, let me know and I can help you set that up!

---

**The HTML templates are ready to use whenever you're ready to upgrade your email system! 🎉**
