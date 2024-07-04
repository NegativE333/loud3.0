"use client";

import { urlFor } from "@/lib/sanity";
import { songsData } from "@/lib/sanity-data-type";
import { cn } from "@/lib/utils";
import { useSong } from "@/store/use-song";
import { Music2, Pause, Play } from "lucide-react";
import Image from "next/image";
import { Poppins } from "next/font/google";

const title = Poppins({ subsets: ['latin'], weight: ['600'] });

type Props = {
    data: songsData;
}

export const SongCard = ({
    data
}: Props) => {

    const { song, updateSong, pause, togglePause } = useSong();

    const isPlaying = song?.currentSlug === data.currentSlug && !pause;

    const handleCardClick = () => {
        if (song?.currentSlug === data.currentSlug) {
            togglePause();
        } else {
            updateSong(data);
        }
    };

    return (
        <div 
            onClick={handleCardClick}
            className={cn("bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-sm w-40 h-fit group transition shadow-md", isPlaying && "bg-opacity-60 hover:bg-opacity-60")}
        >
            <div className="flex items-center justify-center relative">
                <Image
                    src={urlFor(data.cover).url()}
                    alt="Cover"
                    width={130}
                    height={130}
                    className="rounded-sm group-hover:opacity-100 transition"
                />
                <div className="absolute hidden group-hover:block bg-white p-1 rounded-full transition z-10">
                    {isPlaying ? (
                        <Pause className="size-7"/>
                    ) : (
                        <Play className="size-7"/>
                    )}
                </div>
                <h2 className="absolute bg-black/50 w-[90%] text-center text-[13px] py-1 rounded-b hidden group-hover:block transition rounded-sm h-[100%]">
                    <div className="relative h-full">
                        <p className="absolute bottom-0 text-white text-center w-full">
                            {data.album}
                        </p>
                    </div>
                </h2>
                <h2 className={cn("absolute bottom-0 bg-black/80 p-2 rounded-full text-center text-xs text-white group-hover:hidden hidden transition", isPlaying && "block animate-bounce")}>
                    <Music2 />
                </h2>
            </div>
            <div className={cn("flex flex-col text-sm w-full h-full text-center mt-1 capitalize gap-0.5 text-cyan-900", title.className)}>
                <h1 className="">
                    {data.title}
                </h1>
                <h2 className="">
                    {data.artist}
                </h2>
            </div>
        </div>
    )
}
