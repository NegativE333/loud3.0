import db from "@/db/drizzle";
import { user } from "@/db/schema";
import redisClient from "@/redis/redis";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 30;

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        const cachedValue = await redisClient.get(`FAVOURITE_TUNES:${email}`);

        if(cachedValue){
            const favoriteSongs = JSON.parse(cachedValue);
            return NextResponse.json({favoriteSongs, status: 200});
        }

        const userRecords = await db
            .select()
            .from(user)
            .where(eq(user.email, email));

        if (!userRecords || userRecords.length === 0) {
            return NextResponse.json({ message: "User not found", status: 404 });
        }

        const userRecord = userRecords[0];

        const favoriteSongs = userRecord.favoriteSongs || [];

        await redisClient.set(`FAVOURITE_TUNES:${email}`, JSON.stringify(favoriteSongs));

        return NextResponse.json({ favoriteSongs, status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching favorite songs", status: 500 });
    }
}