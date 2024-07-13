"use client";

import { PlayListSheet } from "./playlist-sheet";
import Link from "next/link";
import { TbPlaylist } from 'react-icons/tb';

export const Navbar = () => {

    return(
        <div className="w-full h-full bg-white/90 rounded-b-md flex items-center px-6">
            <Link 
                href="/"
                className="font-semibold text-2xl text-gray-800/90"
            >
                loud
            </Link>
            <div className="ml-auto">
                <PlayListSheet>
                    <TbPlaylist className="text-2xl text-muted-foreground"/>
                </PlayListSheet>
            </div>
        </div>
    )
}