import { ScrollArea } from "@/components/ui/scroll-area";
import { SideBottom } from "./_components/side-bottom";
import { Navbar } from "./_components/navbar";

type Props = {
    children: React.ReactNode;
}

const AuthorizedLayout = ({
    children
}: Props) => {
    return(
        <div className="h-full bg-gradient-to-bl from-[#020617] to-[#1E293B]/95 relative flex flex-col md:flex-row gap-4 select-none">
            <SideBottom />
            <div className="md:hidden fixed w-full h-12 z-30">
                <Navbar />
            </div>
            <ScrollArea className="h-full w-full flex items-center justify-center px-6">
                <div className="mt-12 md:m-6 lg:m-8">
                    {children}
                </div>
            </ScrollArea>
        </div>
    )
}

export default AuthorizedLayout;