"use client";

import { MusicPlayer } from "./music-player";
import { Sidebar } from "./sidebar";
import { useMedia } from "use-media";

export const SideBottom = () => {
    const isMd = useMedia({ maxWidth: "767px" });
    return (
        <div>
            {!isMd && (
                <div className="p-2 h-full w-80">
                    <Sidebar />
                </div>
            )}
            {isMd && (
                <div className="w-full h-16 absolute bottom-4 z-20">
                    <MusicPlayer />
                </div>
            )}
        </div>
    )
}