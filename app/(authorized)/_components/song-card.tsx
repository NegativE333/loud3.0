"use client";

import { urlFor } from "@/lib/sanity";
import { songsData } from "@/lib/sanity-data-type";
import { cn } from "@/lib/utils";
import { useSong } from "@/store/use-song";
import { Loader2, Music2, Pause, Play, Star } from "lucide-react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useEffect, useState, useTransition } from "react";
import { addToFavourite, removeFromFavourite } from "@/actions/favourite";

const title = Poppins({ subsets: ['latin'], weight: ['500'] });

type Props = {
    data: songsData;
}

export const SongCard = ({
    data
}: Props) => {

    const { song, updateSong, pause, togglePause } = useSong();
    const { data: User } = useSession();
    const [userFavourites, setUserFavourites] = useState<string[]>([]);
    const [isFavourite, setIsFavourite] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pending, startTransaction] = useTransition();

    useEffect(() => {
        const getFavourites = async () => {
            try {
                const res = await axios.post("/api/get-favourites", { email: User?.user.email });
                setUserFavourites(res.data.favoriteSongs || []);
            } catch (error) {
                toast.error("Something went wrong while getting your favourites");
            }
        };

        if (User?.user.email) {
            getFavourites();
        }
    }, [User?.user.email]);

    useEffect(() => {
        setIsFavourite(userFavourites.includes(data.currentSlug));
    }, [data.currentSlug, userFavourites]);

    const isPlaying = song?.currentSlug === data.currentSlug && !pause;

    const handleCardClick = () => {
        if (song?.currentSlug === data.currentSlug) {
            togglePause();
        } else {
            updateSong(data);
        }
    };

    const handleFavourite = async () => {
        setIsLoading(true);
        try {
            if (isFavourite) {
                startTransaction(() => {
                    if(User?.user.email){
                        removeFromFavourite({
                            email: User?.user.email, 
                            slug: data.currentSlug
                        })
                        .then((data) => {
                            toast.success(data.message);
                        })
                    }
                })
            } else {
                startTransaction(() => {
                    if(User?.user.email){
                        addToFavourite({
                            email: User?.user.email, 
                            slug: data.currentSlug
                        })
                        .then((data) => {
                            toast.success(data.message);
                        })
                    }
                })
            }

            const updatedFavourites = isFavourite
                ? userFavourites.filter(slug => slug !== data.currentSlug)
                : [...userFavourites, data.currentSlug];

            setUserFavourites(updatedFavourites);
        } catch (error) {
            toast.error("some");
        }
        setIsLoading(false);
    }

    return (
        <div
            onClick={handleCardClick}
            className={cn("bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-sm w-40 h-fit group transition shadow-lg", isPlaying && "bg-opacity-60 hover:bg-opacity-60")}
        >
            <div className="flex items-center justify-center relative">
                <Image
                    src={urlFor(data.cover).url()}
                    alt="Cover"
                    width={130}
                    height={130}
                    className="rounded-sm group-hover:opacity-100 transition"
                    unoptimized
                />
                <div className="absolute hidden group-hover:block bg-white p-1 rounded-full transition z-10 cursor-pointer">
                    {isPlaying ? (
                        <Pause className="size-7" />
                    ) : (
                        <Play className="size-7" />
                    )}
                </div>
                <h2 className="absolute bg-black/50 w-[91%] text-center text-[13px] py-1 rounded-b hidden group-hover:block transition rounded-sm h-[100%]">
                    <div className="relative h-full">
                        <p className="absolute bottom-0 text-white text-center w-full">
                            {data.album}
                        </p>
                    </div>
                </h2>
                <div className={cn("absolute bottom-0 bg-black/80 p-2 rounded-full text-center text-xs text-white group-hover:hidden hidden transition", isPlaying && "block animate-bounce")}>
                    <Music2 />
                </div>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFavourite();
                    }}
                    className="absolute top-0.5 right-2 bg-cyan-900/80 p-0.5 rounded-full text-white cursor-pointer"
                >
                    {isLoading ? (
                        <>
                            <Loader2
                                className="size-4 text-cyan-400/50 animate-spin"
                            />
                        </>
                    ) : (
                        <>
                            <Star
                                className={cn("size-4 text-cyan-400/50", isFavourite && "fill-cyan-500")}
                            />
                        </>
                    )}
                </div>
            </div>
            <div className={cn("flex flex-col text-sm w-full h-full text-center mt-1 capitalize gap-0.5 text-cyan-900/90", title.className)}>
                <h1 className="truncate">
                    {data.title}
                </h1>
                <h2 className="text-xs truncate">
                    {data.artist}
                </h2>
            </div>
        </div>
    )
}