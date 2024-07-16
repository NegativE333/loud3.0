"use client";

import { Nunito, Manrope, Mulish } from "next/font/google";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const title = Nunito({ subsets: ["latin"] });
const subtitle = Manrope({ subsets: ["latin"] });
const content = Mulish({ subsets: ["latin"] });

export const Heading = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 5000);
    }, []);
    
    return(
        <div className="flex flex-col justify-center items-center gap-2">
                <h1
                    className={cn(
                        "text-7xl text-cyan-900 animate-slidein opacity-0 [--slidein-delay:300ms]",
                        title.className
                    )}
                >
                    loud
                </h1>
                <div className="relative w-96 flex items-center justify-center mb-6 mt-3">
                    <h2
                        className={cn(
                            "text-xl text-cyan-800 absolute animate-slideInFadeOut1",
                            subtitle.className
                        )}
                    >
                        Your Ultimate Music Destination
                    </h2>
                    <h2
                        className={cn(
                            "text-xl text-cyan-800 absolute animate-slideInFadeOut2",
                            subtitle.className, !show && "opacity-0"
                        )}
                    >
                        Experience the Best of Music
                    </h2>
                </div>
            </div>
    )
}