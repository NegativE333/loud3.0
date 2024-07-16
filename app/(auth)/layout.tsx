import { Heading } from "./_components/Heading";



type Props = {
    children: React.ReactNode;
}

const AuthLayout = ({
    children
}: Props) => {
    return (
        <div className="h-full bg-gradient-to-tl from-stone-100 via-transparent to-yellow-300 relative flex flex-col gap-6 items-center justify-start pt-16 select-none">
            <Heading />
            <span className="z-10 w-full h-96">
                {children}
            </span>
        </div>
    )
}

export default AuthLayout;
