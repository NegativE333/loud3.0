"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlayListSheet } from "./playlist-sheet";
import Link from "next/link";
import { TbPlaylist } from "react-icons/tb";
import { Search } from "lucide-react";
import { SearchBar } from "./search-bar";
import { useSearch } from "@/store/use-search";
import { useRouter } from "next/navigation";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";

const title = Nunito({ subsets: ["latin"], weight: ["600"] });

export const Navbar = () => {
  const { setSearch, search } = useSearch();
  const router = useRouter();

  const handleClick = () => {
    setSearch("");
    router.push("/");
  };

  return (
    <div className="w-full h-full bg-gradient-to-r from-slate-950/90 to-slate-900/80 flex items-center px-6">
      <div
        onClick={handleClick}
        className={cn(
          "font-bold text-3xl bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent",
          title.className
        )}
      >
        loud
      </div>
      <div className="flex gap-3 items-center justify-center ml-auto">
        <Popover>
          <PopoverTrigger>
            <Search className="size-6 text-slate-200 hover:text-cyan-300 transition" />
          </PopoverTrigger>
          <PopoverContent
            className="w-64 p-0 border-0 bg-transparent shadow-none"
            sideOffset={14}
            align="end"
          >
            <SearchBar />
          </PopoverContent>
        </Popover>
        <PlayListSheet>
          <TbPlaylist className="text-2xl text-slate-200 hover:text-cyan-300 transition" />
        </PlayListSheet>
      </div>
    </div>
  );
};
