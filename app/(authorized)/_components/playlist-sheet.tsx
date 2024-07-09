import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarOptions } from "./sidebar-options";
import { usePathname, useRouter } from "next/navigation";
import { UserActionsBtn } from "./user-actions-btn";

type Props = {
    children: React.ReactNode;
}

export const PlayListSheet = ({
    children
}: Props) => {

    const router = useRouter();
    const pathName = usePathname();

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Play Lists</SheetTitle>
                    <SheetDescription>

                    </SheetDescription>
                </SheetHeader>

                <div className="mt-4 flex flex-col items-start gap-3">
                    <SheetClose>
                        <SidebarOptions 
                            title="All Tracks" 
                            path="/" 
                        />
                    </SheetClose>
                    <SheetClose>
                        <SidebarOptions
                            title="Throwback Tunes"
                            path="/throwbackTunes"
                        />
                    </SheetClose>
                    <SheetClose>
                        <SidebarOptions
                            title="Global Hits"
                            path="/globalhits"
                        />                        
                    </SheetClose>
                    <SheetClose>
                        <SidebarOptions
                            title="Party Starters"
                            path="/partystarters"
                        />
                    </SheetClose>
                    <SheetClose>
                        <SidebarOptions
                            title="Love Ballads"
                            path="/loveballads"
                        />
                    </SheetClose>
                    <SheetClose>
                        <SidebarOptions
                            title="Your favourites"
                            path="/favourite"
                        />
                    </SheetClose>
                </div>
                <SheetFooter className="absolute bottom-4 w-[85%]">
                    <UserActionsBtn />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
