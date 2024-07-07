"use client";

import { getFavourites } from "@/actions/favourite";
import { songsData } from "@/lib/sanity-data-type";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { SongsList } from "../../_components/songs-list"; 
import { Hind } from 'next/font/google';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const heading = Hind({subsets: ['latin'], weight: '500'});

export const Favourites = () => {
    const [pending, startTransition] = useTransition();
    const [songs, setSongs] = useState<songsData[]>();
    const { data: User } = useSession();

    useEffect(() => {
        startTransition(() => {
            getFavourites({email: User?.user.email!})
                .then((res) => {
                    setSongs(res.data);
                })
        })
    }, [User?.user.email]);

    if(!songs){
        return(
            <div className="lg:ml-8 pb-24 md:pb-0">
                <h1 
                    className={cn("text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white/70 to-white inline-block text-transparent bg-clip-text", heading.className)}
                >
                    Your favourites
                </h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-8 w-fit">
                    <Skeleton 
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-sm w-40 h-44 group transition shadow-lg"
                    />
                    <Skeleton 
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-sm w-40 h-44 group transition shadow-lg"
                    />
                    <Skeleton 
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-sm w-40 h-44 group transition shadow-lg"
                    />
                </div>
            </div>
        )
    }

    return (
        <div>
            <SongsList 
                data={songs}
                title="Your favourites" 
            />
        </div>
    );
};
