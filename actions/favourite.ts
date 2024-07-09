"use server";

import db from "@/db/drizzle";
import { user } from "@/db/schema";
import { client } from "@/lib/sanity";
import redisClient from "@/redis/redis";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type Props = {
    email: string,
    slug: string;
}

export const addToFavourite = async ({
    email,
    slug
}: Props) => {
    const userRecord = await db
        .select()
        .from(user)
        .where(
            eq(user.email, email)
        );

    if (userRecord.length === 0) {
        return {message: "User not found"};
    }

    const updatedFavorites = userRecord[0].favoriteSongs ? [...userRecord[0].favoriteSongs, slug] : [slug];

    await db
        .update(user)
        .set({ favoriteSongs: updatedFavorites })
        .where(eq(user.email, email));
    
    await redisClient.del(`FAVOURITE_TUNES:${email}`);
    revalidatePath("/favourite");

    return {message: "Added to Favourite Tunes"};
}

export const removeFromFavourite = async ({
    email,
    slug
} : Props) => {
    const userRecord = await db
            .select()
            .from(user)
            .where(
                eq(user.email, email)
            );

        if(userRecord.length === 0){
            return {message: "User not found"};
        }

        const updatedFavorites = userRecord[0].favoriteSongs?.filter((song) => song !== slug);

        await db
            .update(user)
            .set({ favoriteSongs: updatedFavorites })
            .where(eq(user.email, email));
        
        await redisClient.del(`FAVOURITE_TUNES:${email}`);
        revalidatePath("/favourite");

        return {message: "Removed from Favourite Tunes"};
}

type GetProps = {
    email: string;
}

const getSongs = async (slugs: string[]) => {
    const query = `
    *[_type == 'songs' && slug.current in $slugs] {
      title,
      artist,
      album,
      "currentSlug": slug.current,
      cover,
      audioLink,
      audioDur
    }`;
  
    const params = {slugs};

    const data = await client.fetch(query, params);
    return data;
  }

export const getFavourites = async ({
    email
}: GetProps) => {
    const userRecords = await db
            .select()
            .from(user)
            .where(eq(user.email, email));

        if (!userRecords || userRecords.length === 0) {
            return {message: "User not found."}
        }

        const userRecord = userRecords[0];

        const favoriteSongs = userRecord.favoriteSongs || [];

        const data = await getSongs(favoriteSongs);

        return { data, status: 200 };
}