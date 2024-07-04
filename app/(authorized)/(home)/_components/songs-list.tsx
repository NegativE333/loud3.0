import { songsData } from "@/lib/sanity-data-type"
import { SongCard } from "./song-card";

type Props = {
    data: songsData [];
}

export const SongsList = ({
    data
}: Props) => {
    return(
        <div>
            <h1 className="text-2xl font-bold">
                Top Picks for you...
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-8">
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