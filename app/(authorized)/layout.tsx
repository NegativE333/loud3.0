import { Separator } from "@/components/ui/separator";
import { Sidebar } from "./components/sidebar";
import { MobileBottomBar } from "./components/mobile-bottom-bar";


type Props = {
    children: React.ReactNode;
}

const AuthorizedLayout = ({
    children
}: Props) => {
    return(
        <div className="h-full bg-gradient-to-bl from-gray-900 to-cyan-200/90 relative">
            <div className="p-2 h-full w-80 hidden md:block">
                <Sidebar />
            </div>
            <div className="md:hidden w-full h-16 absolute bottom-0">
                <MobileBottomBar />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default AuthorizedLayout;