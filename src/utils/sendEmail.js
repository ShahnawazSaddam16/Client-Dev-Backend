const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async({to, subject, html}) => {
    const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM,
        to,
        subject,
        html
    });

    if(error){
        throw new Error(error.message);
    }

    return data;
}

const sendCredentialsEmail = async(email, password) => {
    return sendEmail({
        to: email,
        subject: "Your Login Credentials",
        html: `
            <div style="margin:0;padding:32px 16px;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
                    <tr>
                        <td style="background-color:#2563eb;padding:24px 32px;">
                            <h1 style="margin:0;font-size:20px;line-height:1.3;color:#ffffff;font-weight:700;">Buttnetworks</h1>
                            <p style="margin:4px 0 0;font-size:13px;color:#dbeafe;">Client Portal</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:32px;background-color:#ffffff;">
                            <h2 style="margin:0 0 12px;font-size:22px;line-height:1.3;color:#111827;">Your account is ready</h2>
                            <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4b5563;">Use the credentials below to log in to your client portal.</p>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;">
                                <tr>
                                    <td style="padding:20px;">
                                        <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#2563eb;font-weight:700;">Email</p>
                                        <p style="margin:0 0 16px;font-size:15px;color:#111827;word-break:break-all;">${email}</p>
                                        <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#2563eb;font-weight:700;">Password</p>
                                        <p style="margin:0;font-size:20px;letter-spacing:0.15em;color:#111827;font-weight:700;font-family:'Courier New',monospace;">${password}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:16px 32px;background-color:#f9fafb;border-top:1px solid #e5e7eb;">
                            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">&copy; Buttnetworks. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </div>
        `
    });
}

module.exports = {sendEmail, sendCredentialsEmail};