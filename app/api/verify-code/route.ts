import db from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    try{
        const {email, code} = await req.json();

        const User = await db.select().from(user).where(
            eq(user.email, email)
        );

        if(!User){
            return NextResponse.json({message: "User does not exists"}, {status : 404})
        }

        const isCodeValid = User[0].verifyCode === code;
        const isCodeNotExpired = new Date(User[0].verifyCodeExpire) > new Date();

        if(isCodeValid && isCodeNotExpired){
            const values = {
                name: User[0].name,
                email : User[0].email,
                password : User[0].password,
                verifyCode : User[0].verifyCode,
                verifyCodeExpire : User[0].verifyCodeExpire,
                isVerified: true,
            }
            await db.update(user).set(values).where(eq(user.email, email));

            return NextResponse.json({ message: "User verified successfully" }, {status: 200});
        }
        else if(!isCodeNotExpired){
            return NextResponse.json({message: "Verification code expired"}, {status: 400}); 
        }

        return NextResponse.json({message: "Incorrect code"}, {status: 401});
    }
    catch(error){
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}