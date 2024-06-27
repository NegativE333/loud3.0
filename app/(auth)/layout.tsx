import { Music } from "lucide-react";

type Props = {
    children: React.ReactNode;
}

const AuthLayout = ({
    children
}: Props) => {
    return (
        <div className="h-full bg-gradient-to-bl from-gray-900 to-cyan-200/90 relative flex items-center justify-center">
            <Music className="absolute -z-0 w-40 h-40 text-gray-600"/>
            <span className="z-10 w-full">
                {children}
            </span>
        </div>
    )
}

export default AuthLayout;
