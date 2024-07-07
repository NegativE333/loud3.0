import { client } from "@/lib/sanity";
import { songsData } from "@/lib/sanity-data-type";
import { SongsList } from "../_components/songs-list";  

export const revalidate = 30;

const getSongs = async () => {
  const query = `
  *[_type == 'songs' && category == "globalhits"] {
    title,
    artist,
    category,
    album,
    "currentSlug": slug.current,
    cover,
    audioLink,
    audioDur
  }`;

  const data = await client.fetch(query);
  return data;
}

const GlobalHits = async () => {
    const songs: songsData[] = await getSongs();

    return(
        <div>
            <SongsList 
                data={songs}
                title="Global Hits"
            />
        </div>
    )
}

export default GlobalHits;