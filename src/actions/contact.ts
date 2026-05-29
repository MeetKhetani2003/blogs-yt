"use server";

import { sendNotificationEmail } from "@/lib/email";

export async function submitContactForm(formData: any, recaptchaToken: string) {
    try {
        if (!recaptchaToken) {
            return { success: false, error: "reCAPTCHA verification required" };
        }

        // Verify reCAPTCHA
        const verifyRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
        });
        const verifyData = await verifyRes.json();
        
        if (!verifyData.success) {
            return { success: false, error: "reCAPTCHA verification failed" };
        }

        const adminEmail = process.env.ADMIN_EMAIL || "rahulkumar913580@gmail.com";
        
        const emailContent = `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.message}</p>
        `;

        await sendNotificationEmail([adminEmail], `Contact Inquiry: ${formData.subject}`, emailContent);

        return { success: true };
    } catch (error: any) {
        console.error("Contact form error:", error);
        return { success: false, error: "Failed to send message. Please try again later." };
    }
}
