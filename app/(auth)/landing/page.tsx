"use client";

import { cn } from "@/lib/utils";
import { Music2 } from "lucide-react";
import { Nunito, Manrope, Mulish } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
const title = Nunito({ subsets: ["latin"] });
const subtitle = Manrope({ subsets: ["latin"] });
const content = Mulish({ subsets: ["latin"] });

const Landing = () => {
    const router = useRouter();
    const features = [
        "Curated Playlists",
        "Search and Discover",
        "Favorite Tunes",
        "User-Friendly Interface",
        "High-Quality Audio",
    ];
    const [show, setShow] = useState(false);
    const [active, setActive] = useState("features");

    return(
        <div className="flex flex-col items-center justify-start">
            <div className="bg-black/80 rounded-full p-4 mt-20 animate-bounce bg-opacity-40 -z-0">
                <Music2 className="size-48 md:size-56 text-white" />
            </div>
            <div className={cn("flex gap-2 mt-4", subtitle.className)}>
                <div
                    onClick={() => setActive("features")}
                    className={cn(
                        "p-2 rounded-full px-4 border-muted-foreground text-muted-foreground border-2 cursor-pointer transition w-28 text-center",
                        active === "features" &&
                        "text-cyan-900 border-cyan-900 shadow-lg"
                    )}
                >
                    Features
                </div>
                <div
                    onClick={() => setActive("join")}
                    className={cn(
                        "p-2 rounded-full px-4 border-muted-foreground text-muted-foreground border-2 cursor-pointer transition w-28 text-center",
                        active === "join" && "text-cyan-900 border-cyan-900 shadow-lg"
                    )}
                >
                    Join
                </div>
            </div>
            {active === "features" ? (
                <div
                    className={cn(
                        "flex items-center justify-center gap-3 mt-4 flex-wrap max-w-2xl text-sm",
                        content.className
                    )}
                >
                    {features.map((f, i) => {
                        const delay = i * 200 + 100;
                        return (
                            <div
                                key={f}
                                className="shadow-md p-2 rounded-full px-4 border border-muted-foreground text-muted-foreground text-cyan-900 font-semibold transition animate-slidein opacity-0"
                                style={{ "--slidein-delay": `${delay}ms` } as React.CSSProperties}
                            >
                                {f}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div
                    className={cn(
                        "flex items-center justify-center gap-4 mt-4 flex-wrap max-w-2xl text-md",
                        content.className
                    )}
                >
                    <div
                        onClick={() => router.push("/sign-up")}
                        className="border p-2 rounded-full px-3 cursor-pointer animate-slidein opacity-0 [--slidein-delay:300ms]"
                    >
                        Get Started
                    </div>
                    <div
                        onClick={() => router.push("/sign-in")}
                        className="border p-2 rounded-full bg-black/80 text-white px-3 cursor-pointer animate-slidein opacity-0 [--slidein-delay:700ms]"
                    >
                        Sign In
                    </div>
                </div>
            )}
        </div>
    )
}

export default Landing;