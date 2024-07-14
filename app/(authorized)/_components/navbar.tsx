"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PlayListSheet } from "./playlist-sheet";
import Link from "next/link";
import { TbPlaylist } from 'react-icons/tb';
import { Search } from "lucide-react";
import { SearchBar } from "./search-bar";
import { useSearch } from "@/store/use-search";
import { useRouter } from "next/navigation";

export const Navbar = () => {
    const {setSearch, search} = useSearch();
    const router = useRouter();

    const handleClick = () => {
        setSearch("");
        router.push("/");
    }
    
    return(
        <div className="w-full h-full bg-white/90 rounded-b-md flex items-center px-6">
            <div 
                onClick={handleClick}
                className="font-semibold text-2xl text-gray-800/90 select-none"
            >
                loud
            </div>
            <div className="flex gap-3 items-center justify-center ml-auto">
                <Popover>
                    <PopoverTrigger>
                        <Search className="size-6 text-cyan-800/80"/>
                    </PopoverTrigger>
                    <PopoverContent 
                        className="w-64 p-0 shadow-lg"
                        sideOffset={14}
                        align="end"
                    >
                        <SearchBar />
                    </PopoverContent>
                </Popover>
                <PlayListSheet>
                    <TbPlaylist className="text-2xl text-muted-foreground"/>
                </PlayListSheet>
            </div>
        </div>
    )
}