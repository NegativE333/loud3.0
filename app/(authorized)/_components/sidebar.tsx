"use client";

import { Separator } from "@/components/ui/separator"
import { Home, Plus } from "lucide-react"
import { MusicPlayer } from "./music-player";
import Link from "next/link";
import { UserActionsBtn } from "./user-actions-btn";
import { SidebarOptions } from "./sidebar-options";

export const Sidebar = () => {

    return (
        <div className="h-[98%] w-80 bg-white bg-opacity-30 rounded-sm p-4 relative lg:fixed">
            <div className="flex items-center w-full">
                <h1 className="text-3xl font-semibold text-gray-800/90">
                    loud
                </h1>
                <div className="ml-auto p-1 bg-white text-white/70 bg-opacity-40 rounded-lg shadow-md">
                    <Link href="/">
                        <Plus />
                    </Link>
                </div>
            </div>
            <Separator
                className="bg-gray-700 bg-opacity-20 h-0.5 rounded-full my-2"
            />
            <div className="mt-4 flex flex-col gap-3">
                <SidebarOptions 
                    title="loud Tracks"
                    path="/"
                />
                <SidebarOptions 
                    title="Your favourites"
                    path="/favourite"
                />
                <SidebarOptions 
                    title="Old is gold"
                    path="/oldisgold"
                />
            </div>
            <div className="absolute bottom-28 w-full left-0">
                <MusicPlayer />
            </div>
            <div className="absolute bottom-4 flex flex-col w-[90%]">
                <UserActionsBtn />
            </div>
        </div>
    )
}