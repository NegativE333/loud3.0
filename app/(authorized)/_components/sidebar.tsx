"use client";

import { Separator } from "@/components/ui/separator"
import { MusicPlayer } from "./music-player";
import { UserActionsBtn } from "./user-actions-btn";
import { SidebarOptions } from "./sidebar-options";
import {useMedia} from 'use-media';
import Link from "next/link";
import { SearchBar } from "./search-bar";

export const Sidebar = () => {
    const isMd = useMedia({ maxWidth: "767px" });
    return (
        <div className="h-[98%] w-80 bg-white bg-opacity-30 rounded-sm p-4 relative lg:fixed">
            <div className="flex items-center w-full">
                <Link 
                    href={"/"}
                    className="text-3xl font-semibold text-gray-800/90"
                >
                    loud
                </Link>
            </div>
            <Separator
                className="bg-gray-700 bg-opacity-20 h-0.5 rounded-full my-2"
            />
            <div className="my-3">
                <SearchBar />
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
                <SidebarOptions 
                    title="All Tracks"
                    path="/"
                />
                <SidebarOptions 
                    title="Throwback Tunes"
                    path="/throwbackTunes"
                />
                <SidebarOptions 
                    title="Global Hits"
                    path="/globalhits"
                />
                <SidebarOptions 
                    title="Party Starters"
                    path="/partystarters"
                />
                <SidebarOptions 
                    title="Love Ballads"
                    path="/loveballads"
                />
                <SidebarOptions 
                    title="Favourite Tunes"
                    path="/favourite"
                />
            </div>
            {!isMd && (
                <div className="absolute bottom-28 w-full left-0">
                    <MusicPlayer />
                </div>
            )}
            <div className="absolute bottom-4 flex flex-col w-[90%]">
                <UserActionsBtn />
            </div>
        </div>
    )
}