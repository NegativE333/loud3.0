"use client";

import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/lib/sanity";
import { formatTime } from "@/lib/utils";
import { useSong } from "@/store/use-song";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAudio } from 'react-use';

export const MusicPlayer = () => {
    const { song, pause, togglePause, playNextSong, playPrevSong } = useSong();
    const [audioUrl, setAudioUrl] = useState("/audio/coming_soon.mp3");

    useEffect(() => {
        if (song?.audioLink) {
            const { _ref: ref } = song.audioLink?.asset;
            const assetRefParts = ref?.split('-');
            if (assetRefParts) {
                const id = assetRefParts[1];
                const format = assetRefParts[2];
                const url = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${format}`;
                setAudioUrl(url);
            }
        }
    }, [song]);

    const [audio, state, audioControllers] = useAudio({ 
        src: audioUrl, 
        autoPlay: !pause, 
        onEnded: playNextSong
    });

    useEffect(() => {
        if (pause) {
            audioControllers.pause();
        } else {
            audioControllers.play();
        }
    }, [pause, audioControllers]);

    const isPlaying = !pause;

    if (song === null) {
        return (
            <div className="">
                Play a song
            </div>
        )
    }

    const progress = (state.time / state.duration) * 100 || 0;

    return (
        <div className="flex flex-col items-center justify-center gap-2 w-full relative">
            <Separator 
                className="bg-gray-700 bg-opacity-20 h-0.5 rounded-full my-4 w-[90%]"
            />
            <div
                className="absolute top-[30%] left-[20%] cursor-pointer rounded-full bg-white flex items-center bg-opacity-15 hover:bg-opacity-35 shadow-md"
            >
                <ChevronLeft 
                    className=""
                    onClick={playPrevSong}
                />
            </div>
            <div
                className="absolute top-[30%] right-[20%] cursor-pointer rounded-full bg-white flex items-center bg-opacity-15 hover:bg-opacity-35 shadow-md"
            >
                <ChevronRight 
                    className=""
                    onClick={playNextSong}
                />
            </div>
            <div
                onClick={togglePause}
                className="relative group flex items-center justify-center shadow-xl"
            >
                <Image
                    src={urlFor(song.cover).url()}
                    alt="img"
                    width={100}
                    height={100}
                    className="object-contain rounded-md"
                    unoptimized
                />
                <div className="absolute bg-black/50 w-full text-center text-[13px] py-1 rounded-b hidden group-hover:block transition rounded-sm h-[100%] top-0" />
                <div className="absolute hidden group-hover:block bg-white/80 p-1 rounded-full transition z-10 top-[30%] left-[30%] cursor-pointer">
                    {isPlaying ? (
                        <Pause className="size-7" />
                    ) : (
                        <Play className="size-7" />
                    )}
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-0.5 text-center">
                <p className="font-semibold text-gray-900 truncate">
                    {song.title}
                </p>
                <p className="w-[100%] line-clamp-1 text-gray-800">
                    {song.album}
                </p>
                <p className="w-[100%] line-clamp-1 text-gray-700">
                    {song.artist}
                </p>
            </div>
            <div className="relative w-[90%] h-1  rounded-full mt-1 mx-4">
                <div
                    className="absolute top-0 left-0 h-full bg-cyan-900 rounded-full"
                    style={{ width: `${progress}%` }}
                />
                <div className="mt-2 text-sm flex w-full">
                    <p>
                        {state && formatTime(state.time)}
                    </p>
                    <p className="ml-auto">
                        {state && formatTime(state.duration)}
                    </p>
                </div>
            </div>
        
            <div className="hidden">
                {audio}
            </div>
        </div>
    );
}