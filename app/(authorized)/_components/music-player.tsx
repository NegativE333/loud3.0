"use client";

import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/lib/sanity";
import { cn, formatTime, parseLRC } from "@/lib/utils";
import { useSong } from "@/store/use-song";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useAudio } from 'react-use';
import { Manrope, Poppins } from "next/font/google";
import { useExpand } from "@/store/use-expand";
import LiveLyrics from "./live-lyrics";

type LyricLine = {
    time: number;
    text: string;
};

const subtitle = Manrope({ subsets: ["latin"] });
const title = Poppins({ subsets: ['latin'], weight: ['500'] });

export const MusicPlayer = () => {
    const { song, pause, togglePause, playNextSong, playPrevSong } = useSong();
    const { isExpanded, setExpanded } = useExpand();
    const { data } = useSession();
    const [audioUrl, setAudioUrl] = useState("/audio/coming_soon.mp3");
    const [lrc, setLrc] = useState<LyricLine[]>();
    const progressBarRef1 = useRef<HTMLDivElement>(null);
    const progressBarRef2 = useRef<HTMLDivElement>(null);

    const [show, setShow] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (song && !isExpanded) {
            timeoutRef.current = setTimeout(() => {
                setShow(true);
            }, 7000);
        } else {
            setShow(false);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [song, isExpanded]);

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
            setLrc([]);
        }
        if(song?.lrc){
            setLrc(parseLRC(song.lrc));
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

    const handleProgressClick1 = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef1.current) return;

        const rect = progressBarRef1.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * state.duration;
        audioControllers.seek(newTime);
    };

    const handleProgressClick2 = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef2.current) return;

        const rect = progressBarRef2.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * state.duration;
        audioControllers.seek(newTime);
    };

    const isPlaying = !pause;

    if (song === null) {
        return (
            <div className="h-[15rem]">

            </div>
        );
    }

    const progress = (state.time / state.duration) * 100 || 0;

    console.log(audioUrl);

    return (
        <div>
            <div className="md:flex flex-col items-center justify-center gap-2 w-full relative hidden h-[15rem]">
                <Separator
                    className="bg-gray-700 bg-opacity-20 h-0.5 rounded-full my-2"
                />
                <div
                    className="absolute top-[30%] left-[15%] cursor-pointer rounded-full bg-white flex items-center bg-opacity-15 hover:bg-opacity-35 shadow-md"
                >
                    <ChevronLeft
                        className=""
                        onClick={playPrevSong}
                    />
                </div>
                <div
                    className="absolute top-[30%] right-[15%] cursor-pointer rounded-full bg-white flex items-center bg-opacity-15 hover:bg-opacity-35 shadow-md"
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
                <div className={cn("flex flex-col items-center justify-center gap-0.5 text-center w-full", subtitle.className)}>
                    <p className="font-semibold text-gray-900 truncate">
                        {song.title}
                    </p>
                    <div className="relative w-[100%]">
                        <p className="absolute w-[100%] line-clamp-1 text-gray-800 animate-slideInFadeOut21">
                            {song.album}
                        </p>
                        <p className={cn("w-[100%] line-clamp-1 text-gray-700 animate-slideInFadeOut22", !show && "opacity-0")}>
                            {song.artist}
                        </p>
                    </div>
                </div>
                <div className="w-[98%] flex items-center justify-center text-[15px] text-black/80 mt-3 mb-1">
                {lrc && lrc?.length > 0 ? (
                            <LiveLyrics lyrics={lrc} currentTime={state.time}/>
                        ) : ( 
                            <p>
                                Sorry, no lyrics found
                            </p>
                        )}
                </div>
                <div
                    ref={progressBarRef1}
                    className="relative w-full h-1 hover:bg-muted-foreground rounded-full mt-2 mx-4 cursor-pointer"
                    onClick={handleProgressClick1}
                >
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
            <div
                className={cn("h-full w-[96%] bg-white bg-opacity-95 rounded-full px-1 py-1 z-20 mx-2 md:hidden transition", isExpanded && "rounded-2xl h-[160px] px-3 py-2")}
            >
                <div
                    className={("flex items-center")}
                >
                    <Image
                        onClick={setExpanded}
                        src={urlFor(song.cover).url()}
                        height={isExpanded ? 55 : 50}
                        width={isExpanded ? 55 : 50}
                        alt="Song"
                        className={cn("rounded-full transition", isPlaying && "animate-rotate", isExpanded && "animate-rotate2 rounded-md")}
                    />
                    <div
                        onClick={setExpanded}
                        className={cn("ml-3 w-[50%] flex flex-col", title.className, isExpanded && "w-full")}
                    >
                        <p className="truncate text-sm animate-slidein opacity-0 [--slidein-delay:100ms]">
                            {song.title}
                        </p>
                        {isExpanded ? (
                            <>
                                <p className={cn("hidden truncate text-xs text-muted-foreground transition", isExpanded && "flex")}>
                                    {song.album}
                                </p>
                                <p className="truncate text-xs text-muted-foreground/80">
                                    {song.artist}
                                </p> 
                            </>
                        ) : (
                            <div className="relative flex flex-col items-start justify-start text-xs text-muted-foreground h-5">
                                <p className="absolute animate-slideInFadeOut21 truncate w-[99%]">
                                    {song.album}
                                </p>
                                <p className={cn("absolute animate-slideInFadeOut22 truncate w-[99%]", !show && "opacity-0")}>
                                    {song.artist}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className={cn("flex items-center justify-center gap-2 ml-auto", isExpanded && "hidden")}>
                        <ChevronLeft
                            onClick={playPrevSong}
                            className="size-7 text-cyan-800/80"
                        />
                        {isPlaying ? (
                            <Pause
                                onClick={togglePause}
                                className="size-7 outline-cyan-950 text-cyan-800/80"
                            />
                        ) : (
                            <Play
                                onClick={togglePause}
                                className="size-7 outline-cyan-950 text-cyan-800/80"
                            />
                        )}
                        <ChevronRight
                            onClick={playNextSong}
                            className="size-7 text-cyan-800/80"
                        />
                    </div>
                </div>
                <div className={cn("hidden mb-1 mt-2 text-xs w-full justify-center items-center text-muted-foreground", isExpanded && "flex flex-col")}>
                    <div className="w-[98%] flex items-center justify-center text-[15px] text-cyan-900/80 h-6">
                        {lrc && lrc?.length > 0 ? (
                            <LiveLyrics lyrics={lrc} currentTime={state.time}/>
                        ) : ( 
                            <p>
                                Sorry, no lyrics found
                            </p>
                        )}
                    </div>
                    <div className="flex justify-between items-end w-full mt-3">
                        <p>{formatTime(state.time)}</p>
                        <div className="flex items-center gap-3 pb-3 text-cyan-800/80">
                            <ChevronLeft onClick={playPrevSong} />
                            {isPlaying ? (
                                <Pause onClick={togglePause}/>
                            ) : (
                                <Play onClick={togglePause}/>
                            )}
                            <ChevronRight onClick={playNextSong}/>
                        </div>
                        <p>{formatTime(state.duration)}</p>
                    </div>
                </div>
                <div
                    ref={progressBarRef2}
                    className={cn("hidden h-1 rounded-full  cursor-pointer bg-muted-foreground/50 transition ml-0.5", isExpanded && "flex")}
                    onClick={handleProgressClick2}
                >
                    <div
                        className="h-1 bg-cyan-900 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            <div className="hidden">
                {audio}
            </div>
        </div>
    );
};
