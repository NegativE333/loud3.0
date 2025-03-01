import { cn } from "@/lib/utils";
import { Hind } from 'next/font/google';
import { SkeletonLoading } from "../_components/skeleton-loading";

const heading = Hind({ subsets: ['latin'], weight: '500' });

const Loading = () => {
    return (
        <div className="pb-24 md:pb-0">
            <h1
                className={cn("text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white/70 to-white inline-block text-transparent bg-clip-text", heading.className)}
            >
                Party Starters
            </h1>
            <SkeletonLoading />
        </div>
    )
}

export default Loading;