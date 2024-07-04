import { Sidebar } from "./_components/sidebar";
import { MobileBottomBar } from "./_components/mobile-bottom-bar";

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
            <div className="m-8">
                {children}
            </div>
        </div>
    )
}

export default AuthorizedLayout;