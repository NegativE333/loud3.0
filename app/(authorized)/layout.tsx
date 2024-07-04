import { Sidebar } from "./_components/sidebar";
import { MobileBottomBar } from "./_components/mobile-bottom-bar";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
    children: React.ReactNode;
}

const AuthorizedLayout = ({
    children
}: Props) => {
    return(
        <div className="h-full bg-gradient-to-bl from-gray-900 to-cyan-200/90 relative flex gap-4">
            <div className="p-2 h-full w-80 hidden md:block">
                <Sidebar />
            </div>
            <div className="md:hidden w-full h-16 absolute bottom-0">
                <MobileBottomBar />
            </div>
            <ScrollArea className="h-full w-full ml-12 pr-12">
                <div className="m-4 md:m-6 lg:m-8">
                    {children}
                </div>
            </ScrollArea>
        </div>
    )
}

export default AuthorizedLayout;