"use client";

import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const SearchBar = () => {

    const pathName = usePathname();
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        if(pathName === '/'){
            setSearchTitle("All Tracks");
        }    
        else if(pathName === "/throwbackTunes"){
            setSearchTitle("Throwback Tunes");
        }
        else if(pathName === "/globalhits"){
            setSearchTitle("Global Hits");
        }
        else if(pathName === "/partystarters"){
            setSearchTitle("Party Starters");
        }
        else if(pathName === "/loveballads"){
            setSearchTitle("Love Ballads");
        }
        else if(pathName === "/favourite"){
            setSearchTitle("Favourite Tunes");
        }
    }, [pathName]);

    return(
        <div 
            className="bg-white/50 rounded-md w-full h-fit flex items-center gap-2 p-2"
        >
            <Search className="size-5 text-cyan-900"/>
            <input 
                className="w-full bg-transparent focus:outline-none focus:border-none"
                placeholder={`Search in ${searchTitle}`}
            />
        </div>
    )
}