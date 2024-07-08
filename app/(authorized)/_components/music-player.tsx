"use client";

import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/lib/sanity";
import { formatTime } from "@/lib/utils";
import { useSong } from "@/store/use-song";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAudio } from 'react-use';

export const MusicPlayer = () => {
    const { song, pause, togglePause, playNextSong, playPrevSong } = useSong();
    const { data } = useSession();
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
            <div className="text-center font-semibold text-cyan-900/70 md:flex flex-col items-center justify-center hidden">
                <Separator
                    className="bg-gray-700 bg-opacity-20 h-0.5 rounded-full my-8 w-[90%]"
                />
                <div className="px-4 leading-7">
                    Welcome <span className="text-cyan-900">{data?.user.name}</span>
                    <p>
                        Ready to discover some great music? Click one any music card to start your musical journey. Explore our playlists or find your favorite tracks. Enjoy the beats!
                    </p>
                </div>
            </div>
        )
    }

    const progress = (state.time / state.duration) * 100 || 0;

    return (
        <div>
            <div className="md:flex flex-col items-center justify-center gap-2 w-full relative hidden">
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
            </div>
            <div className="h-full w-[97%] bg-white bg-opacity-95 rounded-full px-2 py-1 flex items-center z-20 mx-2 md:hidden">
                <Image
                    src={urlFor(song.cover).url()}
                    height={45}
                    width={45}
                    alt="Song"
                    className="rounded-full animate-spin duration-[3000ms] transition"
                />
                <div className="ml-4 w-[50%]">
                    <p className="truncate font-semibold">
                        {song.title}
                    </p>
                    <p className="truncate text-muted-foreground">
                        {song.artist}
                    </p>
                </div>
                <div className="flex flex-col ml-auto">
                    <div className="flex items-center justify-center gap-2 mt-1">
                        <ChevronLeft
                            onClick={playPrevSong}
                            className="size-7"
                        />
                        {isPlaying ? (
                            <Pause
                                onClick={togglePause}
                                className="size-7"
                            />
                        ): (
                            <Play 
                                onClick={togglePause}
                                className="size-7"
                            />
                        )}
                        <ChevronRight
                            onClick={playNextSong}
                            className="size-7"
                        />
                    </div>
                    <div className="flex mx-auto gap-8 text-xs mt-2 w-[80%]">
                        <p>{state && formatTime(state.time)}</p>
                        <p>{state && formatTime(state.duration)}</p>
                    </div>
                </div>
            </div>
            <div className="hidden">
                {audio}
            </div>
        </div>
    );
}