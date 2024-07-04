"use client";

import { songsData } from "@/lib/sanity-data-type"
import { SongCard } from "./song-card";
import { Hind } from 'next/font/google';
import { cn } from "@/lib/utils";
import { useSong } from "@/store/use-song";
import { useEffect } from "react";

const heading = Hind({subsets: ['latin'], weight: '500'});

type Props = {
    data: songsData [];
}

export const SongsList = ({
    data
}: Props) => {

    const {setSongsList} = useSong();

    useEffect(() => {
        setSongsList(data);
    }, [data, setSongsList]);

    return(
        <div>
            <h1 
                className={cn("text-4xl font-bold bg-gradient-to-r from-white via-white/70 to-white/60 inline-block text-transparent bg-clip-text", heading.className)}
            >
                Exclusive Tracks Selected for You by  <span className="text-white/80">
                    loud
                </span>
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-8 w-fit">
                {data.map((d) => (
                    <SongCard 
                        key={d.currentSlug}
                        data={d} 
                    />
                ))}
            </div>
        </div>
    )
}