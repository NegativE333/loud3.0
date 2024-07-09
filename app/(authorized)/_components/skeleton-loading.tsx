import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonLoading = () => {
    return(
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8 mt-4 md:mt-8 w-fit">
                <Skeleton
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-sm w-40 h-44 group transition shadow-lg"
                />
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
    )
}