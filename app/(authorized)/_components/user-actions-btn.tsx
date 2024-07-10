import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LogOut, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"


export const UserActionsBtn = () => {
    const { data } = useSession();

    return (
        <div>
            <Separator
                className="bg-gray-700 bg-opacity-20 h-0.5 rounded-full my-4 w-full"
            />
            <div className="flex gap-4 items-center">
                <Button
                    className="bg-white bg-opacity-40 text-gray-800 hover:bg-white hover:bg-opacity-60 hover:shadow-sm max-w-[55%]"
                >
                    <User
                        className="size-4 mr-1"
                    />
                    <p className="truncate">
                        {data?.user.name}
                    </p>
                </Button>
                <Button
                    className="bg-white bg-opacity-40 text-gray-800 hover:bg-white hover:bg-opacity-60 hover:shadow-sm ml-auto"
                    onClick={() => signOut()}
                >
                    <LogOut className="size-4 mr-1" />
                    Sign Out
                </Button>
            </div>
        </div>
    )
}