import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

interface EmailTemplateProps {
    title: string;
    description: string;
    imageUrl: string;
    blogUrl: string;
}

export const generateBlogNotificationHTML = ({ title, description, imageUrl, blogUrl }: EmailTemplateProps) => `
    <div style="font-family: 'Inter', sans-serif; max-w-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9;">
        <div style="text-align: center; margin-bottom: 24px;">
            <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #d97706; font-weight: bold; margin: 0;">New Publication</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
            <img src="${imageUrl}" alt="Featured Image" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px; object-fit: cover; max-height: 300px;" />
            
            <h2 style="color: #0f172a; font-size: 24px; margin-top: 0; margin-bottom: 12px; line-height: 1.3;">
                ${title}
            </h2>
            
            <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
                ${description}
            </p>
            
            <a href="${blogUrl}" style="display: inline-block; background-color: #0f172a; color: #ffffff; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px;">
                Read Full Publication
            </a>
        </div>
        
        <div style="text-align: center; margin-top: 24px;">
            <p style="font-size: 11px; color: #94a3b8;">
                You are receiving this because you are subscribed to notifications on Technical Rahul Pandey's platform.
            </p>
        </div>
    </div>
`;

export const sendNotificationEmail = async (to: string[], subject: string, htmlContent: string) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("⚠️ Nodemailer credentials not configured. Skipping email send.");
        return { success: false, error: 'Credentials missing' };
    }

    try {
        await transporter.sendMail({
            from: `"Technical Rahul Pandey" <${process.env.EMAIL_USER}>`,
            bcc: to, // Use BCC for mass emails to preserve privacy
            subject,
            html: htmlContent,
        });
        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
};
