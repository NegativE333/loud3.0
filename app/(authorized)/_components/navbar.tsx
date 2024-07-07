"use client";

import { Menu } from "lucide-react";
import { PlayListSheet } from "./playlist-sheet";

export const Navbar = () => {

    return(
        <div className="w-full h-full bg-white/60 rounded-b-md flex items-center px-4">
            <h1 className="font-semibold text-2xl">loud</h1>
            <div className="ml-auto">
                <PlayListSheet>
                    <Menu />
                </PlayListSheet>
            </div>
        </div>
    )
}