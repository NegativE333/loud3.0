"use client";

import { songsData } from "@/lib/sanity-data-type";
import { SongCard } from "./song-card";
import { Hind } from "next/font/google";
import { cn } from "@/lib/utils";
import { useSong } from "@/store/use-song";
import { useEffect, useState, useTransition } from "react";
import { AudioLines, Loader2 } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { addToFavourite, removeFromFavourite } from "@/actions/favourite";
import { useExpand } from "@/store/use-expand";
import { useSearch } from "@/store/use-search";
import { usePathname } from "next/navigation";
import {
  getEmptyStateMessage,
  getRandomMusicalQuote,
} from "../_helpers/index.util";

const heading = Hind({ subsets: ["latin"], weight: "500" });

type Props = {
  data: songsData[];
  title: string;
};

export const SongsList = ({ data, title }: Props) => {
  const { data: User } = useSession();
  const { setSongsList, song } = useSong();
  const { search, setSearch } = useSearch();
  const { isExpanded } = useExpand();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(false);
  const [userFavourites, setUserFavourites] = useState<string[]>([]);
  const [pending, startTransaction] = useTransition();

  useEffect(() => {
    setSongsList(data);
    setSearch("");
  }, [data, setSongsList, setSearch]);

  useEffect(() => {
    const getFavourites = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post("/api/get-favourites", {
          email: User?.user.email,
        });
        setUserFavourites(res.data.favoriteSongs || []);
      } catch (error) {
        toast.error("Something went wrong while getting your favourites");
      }
      setIsLoading(false);
    };

    if (User?.user.email) {
      getFavourites();
    }
  }, [User?.user.email]);

  const handleFavourite = async (isFavourite: boolean, slug: string) => {
    console.log("rerendered");
    try {
      if (isFavourite) {
        startTransaction(() => {
          if (User?.user.email) {
            removeFromFavourite({
              email: User?.user.email,
              slug: slug,
            }).then((data) => {
              toast.success(data.message, {
                position: "bottom-left",
                className:
                  "md:bg-white/90 flex justify-center items-center gap-2 w-fit left-[10%]",
                icon: <AudioLines className="size-4 md:size-5" />,
              });
            });
          }
        });
      } else {
        startTransaction(() => {
          if (User?.user.email) {
            addToFavourite({
              email: User?.user.email,
              slug: slug,
            }).then((data) => {
              toast.success(data.message, {
                position: "bottom-left",
                className:
                  "md:bg-white/90 flex justify-center items-center gap-2 w-fit left-[10%]",
                icon: <AudioLines className="size-4 md:size-5" />,
              });
            });
          }
        });
      }

      const updatedFavourites = isFavourite
        ? userFavourites.filter((s) => s !== slug)
        : [...userFavourites, slug];

      setUserFavourites(updatedFavourites);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const filteredData = search
    ? data.filter(
        (d) =>
          d.title.toLowerCase().includes(search.toLowerCase()) ||
          d.artist.toLowerCase().includes(search.toLowerCase()) ||
          d.album.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return (
    <div className={cn("pb-4 md:pb-0", song && "pb-20", isExpanded && "pb-36")}>
      <h1
        className={cn(
          "text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white/70 to-white inline-block text-transparent bg-clip-text",
          heading.className,
          search.length > 0 && "text-2xl"
        )}
      >
        {search.length > 0 ? (
          <p>Search Results for : {search}</p>
        ) : (
          <p>{title}</p>
        )}
      </h1>
      <div className="flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-8 w-fit">
        {filteredData.map((d) => {
          const isFavourite = userFavourites?.includes(d.currentSlug);
          return (
            <div key={d.currentSlug} className="relative">
              <div
                className={cn(
                  "absolute top-2.5 right-4 bg-white/90 p-1 rounded-full text-white cursor-pointer z-10",
                  isFavourite && "bg-black/80"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavourite(isFavourite, d.currentSlug);
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 text-black animate-spin" />
                  </>
                ) : (
                  <>
                    <AudioLines
                      className={cn(
                        "size-4 text-black",
                        isFavourite && "text-white"
                      )}
                    />
                  </>
                )}
              </div>
              <SongCard key={d.currentSlug} data={d} />
            </div>
          );
        })}
      </div>
      {filteredData.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          {" "}
          <div className="flex flex-col gap-12">
            {" "}
            <div className="relative flex items-center justify-center">
              <div className="absolute animate-ping opacity-30 rounded-full h-32 w-32 bg-white/5 duration-1000" />
              <div className="absolute animate-pulse opacity-40 rounded-full h-24 w-24 bg-white/10 duration-[1500ms]" />
              <AudioLines className="w-16 h-16 text-white/60 relative z-10 animate-[pulse_2s_ease-in-out_infinite]" />
            </div>
            <div className="space-y-4 text-center">
              <h3 className="text-xl md:text-2xl font-semibold text-white/90">
                {getEmptyStateMessage(pathname).title}
              </h3>
              <p className="text-sm md:text-base text-gray-400/80 max-w-md mx-auto">
                {getEmptyStateMessage(pathname).description}
              </p>
            </div>
            <div className="mt-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <blockquote className="relative px-6 py-4">
                <span className="absolute top-0 left-0 text-2xl text-white/20">
                  &ldquo;
                </span>
                <span className="absolute bottom-0 right-0 text-2xl text-white/20">
                  &rdquo;
                </span>
                <p className="text-base md:text-lg text-white/80 font-medium leading-relaxed text-center">
                  {getRandomMusicalQuote()}
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
