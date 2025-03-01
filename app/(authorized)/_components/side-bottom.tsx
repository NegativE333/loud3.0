"use client";

import { cn } from "@/lib/utils";
import { MusicPlayer } from "./music-player";
import { Sidebar } from "./sidebar";
import { useMedia } from "use-media";
import { useExpand } from "@/store/use-expand";

export const SideBottom = () => {
  const isMd = useMedia({ maxWidth: "767px" });
  const { isExpanded } = useExpand();

  return (
    <div>
      {!isMd && (
        <div className="p-2 h-full w-80">
          <Sidebar />
        </div>
      )}
      {isMd && (
        <div
          className={cn(
            "w-full h-16 fixed bottom-2 z-50",
            isExpanded && "bottom-[110px]"
          )}
        >
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};
