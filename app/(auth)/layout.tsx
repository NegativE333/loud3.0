import { Music, Music2 } from "lucide-react";

type Props = {
    children: React.ReactNode;
}

const AuthLayout = ({
    children
}: Props) => {
    return (
        <div className="h-full bg-gradient-to-bl from-gray-900 to-cyan-200/90 relative flex items-center justify-center">
            <div className="absolute -z-0 animate-bounce">
                <Music2 className="size-40 text-black"/>
            </div>
            <span className="z-10 w-full">
                {children}
            </span>
        </div>
    )
}

export default AuthLayout;
