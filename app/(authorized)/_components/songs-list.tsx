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
    title: string;
}

export const SongsList = ({
    data,
    title
}: Props) => {

    const {setSongsList} = useSong();

    useEffect(() => {
        setSongsList(data);
    }, [data, setSongsList]);

    return(
        <div className="ml-0 lg:ml-8 mx-0">
            <h1 
                className={cn("text-4xl font-bold bg-gradient-to-r from-white via-white/70 to-white inline-block text-transparent bg-clip-text", heading.className)}
            >
                {title}
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