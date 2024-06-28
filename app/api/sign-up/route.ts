import { NextRequest, NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/nodemailer';
import { emailTemplate } from '@/lib/email-template';
import db from '@/db/drizzle';
import { user } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();
        
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const existingVerifiedUserByEmail = await db.select().from(user).where(
            and(
                eq(user.email, email),
                eq(user.isVerified, true)
            )
        );

        if(existingVerifiedUserByEmail.length > 0){
            return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
        }

        const existingUserByEmail = await db.select().from(user).where(
            and(
                eq(user.email, email),
                eq(user.isVerified, false)
            )
        );

        const hashedPassword = await bcrypt.hash(password, 10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        if(existingUserByEmail){
            await db.delete(user).where(eq(email, user.email));
        }

        const newUser = await db.insert(user).values({
            id: crypto.randomUUID(),
            name,
            email,
            password: hashedPassword,
            verifyCode: verificationCode,
            verifyCodeExpire: expiryDate.toString(),
        });

        const sentEmail = await transporter.sendMail({
            ...mailOptions,
            to: email,
            subject: 'Email Verification',
            text: `Your verification code is ${verificationCode}`,
            html: emailTemplate(verificationCode),
        });

        return NextResponse.json({message: "Verification email sent successfull"}, {status: 200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
