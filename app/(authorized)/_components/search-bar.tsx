"use client";

import { useSearch } from "@/store/use-search";
import { Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const SearchBar = () => {
    const pathName = usePathname();
    const { search, setSearch} = useSearch();
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        if (pathName === '/') {
            setSearchTitle("All Tracks");
        }
        else if (pathName === "/throwbackTunes") {
            setSearchTitle("Throwback Tunes");
        }
        else if (pathName === "/globalhits") {
            setSearchTitle("Global Hits");
        }
        else if (pathName === "/partystarters") {
            setSearchTitle("Party Starters");
        }
        else if (pathName === "/loveballads") {
            setSearchTitle("Love Ballads");
        }
        else if (pathName === "/favourite") {
            setSearchTitle("Favourite Tunes");
        }
    }, [pathName]);


    return (
        <div 
            className="bg-white/5 hover:bg-white/8 rounded-md w-full h-fit flex items-center gap-2 p-2.5 transition-colors duration-200 ring-1 ring-white/10"
        >
            <Search className="size-5 text-slate-400"/>
            <input
                className="w-full bg-transparent focus:outline-none text-slate-200 placeholder:text-slate-400"
                placeholder={`Search in ${searchTitle}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {search.length > 0 && (
                <X 
                    onClick={() => setSearch("")}
                    className="size-5 text-slate-400 hover:text-slate-200 transition-colors duration-200 hover:cursor-pointer"
                />
            )}
        </div>
    );
};
