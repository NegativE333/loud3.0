import { Sidebar } from "./_components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MusicPlayer } from "./_components/music-player";
import { SideBottom } from "./_components/side-bottom";

type Props = {
    children: React.ReactNode;
}

const AuthorizedLayout = ({
    children
}: Props) => {
    return(
        <div className="h-full bg-gradient-to-bl from-gray-900 to-cyan-200/90 relative flex gap-4">
            <SideBottom />
            <ScrollArea className="h-full w-full md:ml-8 md:pr-12 ml-0">
                <div className=" mt-4 md:m-6 lg:m-8">
                    {children}
                </div>
            </ScrollArea>
        </div>
    )
}

export default AuthorizedLayout;