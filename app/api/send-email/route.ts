import { NextRequest, NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/nodemailer';
import { emailTemplate } from '@/lib/email-template';

export async function POST(req: NextRequest) {
    try {
        const { to, subject, verificationCode } = await req.json();
        

        await transporter.sendMail({
            ...mailOptions,
            to,
            subject,
            text: `Your verification code is ${verificationCode}`,
            html: emailTemplate(verificationCode),
        });

        return NextResponse.json({ message: 'Email sent successfully', verificationCode }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
