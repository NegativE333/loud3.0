import Image from "next/image"


export const MusicPlayer = () => {
    return (
        <div className="flex items-center justify-start gap-2">
            <Image
                src="/images/khairiyat.jpg"
                alt="img"
                width={100}
                height={100}
                className="object-contain rounded-md"
                unoptimized
            />
            <div className="flex flex-col gap-1">
                <p className="font-semibold text-gray-900 truncate w-[85%]">
                    Khairiyat
                </p>
                <p className="w-[100%] line-clamp-1 text-gray-800">
                    Chhichhore
                </p>
                <p className="w-[100%] line-clamp-1 text-gray-700">
                    Arjit Singh
                </p>
            </div>
        </div>
    )
}