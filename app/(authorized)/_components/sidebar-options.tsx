"use client";

import { cn } from "@/lib/utils";
import { Music2 } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hind } from "next/font/google";

const font = Hind({subsets: ['latin'], weight: '500'});

type Props = {
    title: string;
    path: string;
}

export const SidebarOptions = ({
    title,
    path
}: Props) => {

    const pathName = usePathname();

    const isActive = pathName === path;

    return(
        <div 
            className={cn("w-full flex items-center gap-2 text-muted-foreground transition hover:text-cyan-900/80", isActive && "text-cyan-900/90", font.className)}
        >
            <Music2 className="size-5"/>
            <Link 
                href={path}
                className="text-lg"
            >
                {title}
            </Link>
        </div>
    )
}