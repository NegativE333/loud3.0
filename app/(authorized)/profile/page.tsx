"use client";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Hind } from 'next/font/google';
import Loading from "./loading";

const heading = Hind({ subsets: ['latin'], weight: '500' });

const Profile = () => {
    const {data} = useSession();

    if(!data){
        return <Loading />
    }

    return(
        <div>
            <h1
                className={cn("text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white/70 to-white inline-block text-transparent bg-clip-text", heading.className)}
            >
                Good Afternoon, {data.user.name?.split(" ")[0]}
            </h1>
            <div>

            </div>
        </div>
    )
}

export default Profile;