"use client";

import { cn } from "@/lib/utils";
import { Music2 } from "lucide-react"
import { usePathname, useRouter } from "next/navigation";
import { Hind } from "next/font/google";
import { Button } from "@/components/ui/button";

const font = Hind({ subsets: ['latin'], weight: '500' });

type Props = {
    title: string;
    path: string;
}

export const SidebarOptions = ({
    title,
    path
}: Props) => {

    const pathName = usePathname();
    const router = useRouter();
    const isActive = pathName === path;

    return (
        <Button
            className={cn("w-fit flex items-center gap-2 text-muted-foreground transition hover:text-cyan-900/80 text-xl hover:bg-transparent bg-transparent border-none outline-none hover:border-none hover:outline-none focus:border-none focus:outline-none", isActive && "text-cyan-900/90", font.className)}
            onClick={() => router.push(path)}
        >
            <Music2 className="size-5"/>
            <p className="text-lg">
                {title}
            </p>
        </Button>
    )
}