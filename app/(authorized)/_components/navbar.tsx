"use client";

import { Menu } from "lucide-react";
import { PlayListSheet } from "./playlist-sheet";
import Link from "next/link";

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
                    <Menu />
                </PlayListSheet>
            </div>
        </div>
    )
}