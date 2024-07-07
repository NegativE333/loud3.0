import { client } from "@/lib/sanity";
import { songsData } from "@/lib/sanity-data-type";
import { SongsList } from "../_components/songs-list";

export const revalidate = 30;

const getSongs = async () => {
  const query = `
  *[_type == 'songs'] {
    title,
    artist,
    album,
    "currentSlug": slug.current,
    cover,
    audioLink,
    audioDur
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: songsData [] = await getSongs();

  return (
    <div>
        <SongsList 
          data={data}
          title="Exclusive Tracks Selected for You by loud"
        />
    </div>
  );
}
