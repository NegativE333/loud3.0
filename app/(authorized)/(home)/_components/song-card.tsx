import { urlFor } from "@/lib/sanity";
import { songsData } from "@/lib/sanity-data-type"
import { Play } from "lucide-react";
import Image from "next/image";


type Props = {
    data: songsData;
}

export const SongCard = ({
    data
}: Props) => {

    return(
        <div className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-sm w-40 h-48 group transition">
            <div className="flex items-center justify-center relative">
                <Image 
                    src={urlFor(data.cover).url()}
                    alt="Cover"
                    width={130}
                    height={130}
                    className="rounded-sm group-hover:opacity-70 transition"
                />
                <div className="absolute hidden group-hover:block bg-cyan-700 bg-opacity-70 p-1 rounded-full">
                    <Play className="text-white/70 size-7"/>
                </div>
                <h2 className="absolute bottom-0 bg-cyan-900/50 w-[90%] text-center text-sm text-neutral-100 rounded-b hidden group-hover:block">
                    {data.album}
                </h2>
            </div>
            <div className="flex flex-col text-sm w-full h-full text-center mt-1">
                <h1 className="font-semibold">
                    {data.title}
                </h1>
                <h2 className="">
                    {data.artist}
                </h2>
            </div>
        </div>
    )
}