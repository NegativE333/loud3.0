import { Separator } from "@/components/ui/separator";
import { Sidebar } from "./components/sidebar";


type Props = {
    children: React.ReactNode;
}

const AuthorizedLayout = ({
    children
}: Props) => {
    return(
        <div className="h-full bg-gradient-to-bl from-gray-900 to-cyan-200/90">
            <div className="p-2 h-full w-80">
                <Sidebar />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default AuthorizedLayout;