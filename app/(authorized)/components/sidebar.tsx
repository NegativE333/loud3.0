"use client";

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LogOut, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { MusicPlayer } from "./music-player";

export const Sidebar = () => {
    const {data} = useSession();
    console.log(data);
    return (
        <div className="h-full w-full bg-white bg-opacity-30 rounded-sm p-4 relative">
            <h1 className="text-3xl font-semibold text-gray-800/90">
                loud
            </h1>
            <Separator
                className="bg-gray-700 bg-opacity-20 h-0.5 rounded-full my-2"
            />
            <div className="absolute bottom-28">
                <MusicPlayer />
            </div>
            <div className="absolute bottom-4 flex flex-col w-[90%]">
                <Separator
                    className="bg-gray-700 bg-opacity-20 h-0.5 rounded-full my-2"
                />
                <div className="flex items-center">
                    <Button
                        className="bg-white bg-opacity-40 text-gray-800 hover:bg-white hover:bg-opacity-60 hover:shadow-sm max-w-[55%]"
                    >
                        <User 
                            className="size-4 mr-1"
                        />
                        <p className="truncate">
                            {data?.user.name}
                        </p>
                    </Button>
                    <Button
                        className="bg-white bg-opacity-40 text-gray-800 hover:bg-white hover:bg-opacity-60 hover:shadow-sm ml-auto"
                        onClick={() => signOut()}
                    >
                        <LogOut className="size-4 mr-1"/>
                        Sign Out
                    </Button>
                </div>
            </div>
        </div>
    )
}