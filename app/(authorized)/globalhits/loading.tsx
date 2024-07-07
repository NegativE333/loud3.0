import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Hind } from 'next/font/google';

const heading = Hind({ subsets: ['latin'], weight: '500' });

const Loading = () => {
    return (
        <div className="ml-8">
            <h1
                className={cn("text-4xl font-bold bg-gradient-to-r from-white via-white/70 to-white inline-block text-transparent bg-clip-text", heading.className)}
            >
                Global Hits
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-8 w-fit">
                <Skeleton
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-sm w-40 h-44 group transition shadow-lg"
                />
                <Skeleton
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-sm w-40 h-44 group transition shadow-lg"
                />
                <Skeleton
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-sm w-40 h-44 group transition shadow-lg"
                />
            </div>
        </div>
    )
}

export default Loading;