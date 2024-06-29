import { Separator } from "@/components/ui/separator"
import Image from "next/image"


export const MobileBottomBar = () => {
    return(
        <div className="h-full w-full bg-white bg-opacity-30 rounded-sm px-8 py-2 flex items-center">
            <Image 
                src="/images/khairiyat.jpg"
                height={30}
                width={30}
                alt="Song"
                className="rounded-full animate-spin duration-[5000ms] transition"
            />
            <p className="ml-4 text-lg font-semibold">
                Khairiyat
            </p>
            <Separator 
                orientation="vertical" 
                className="w-0.5 ml-4 rounded-lg h-[50%]"
            />
            <p className="ml-4 text-lg font-semibold">
                Chhichhore
            </p>
            <Separator 
                orientation="vertical" 
                className="w-0.5 ml-4 rounded-lg h-[50%]"
            />
            <p className="ml-4 text-lg font-semibold">
                Arjit Singh
            </p>
            
        </div>
    )
}