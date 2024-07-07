import { client } from "@/lib/sanity";
import { songsData } from "@/lib/sanity-data-type";
import { SongsList } from "../_components/songs-list";  

export const revalidate = 30;

const getSongs = async () => {
  const query = `
  *[_type == 'songs' && category == "partystarters"] {
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

const PartyStarters = async () => {
    const songs: songsData[] = await getSongs();

    return(
        <div>
            <SongsList 
                data={songs}
                title="Party Starters"
            />
        </div>
    )
}

export default PartyStarters;