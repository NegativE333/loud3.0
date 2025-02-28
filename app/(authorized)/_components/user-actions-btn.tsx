import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const UserActionsBtn = () => {
  const { data } = useSession();
  const router = useRouter();
  return (
    <div>
      <Separator className="bg-gray-700 bg-opacity-20 h-0.5 rounded-full my-4 w-full" />
      <div className="flex gap-4 items-center w-full">
        <Button
          onClick={() => router.push("/profile")}
          className="bg-gray-900/50 text-gray-200 hover:bg-gray-700/60 hover:text-white max-w-[55%] transition-colors"
        >
          <User className="size-4 mr-1" />
          <p className="truncate">{data?.user.name}</p>
        </Button>
        <Button
          className="bg-gray-800/50 text-gray-200 hover:bg-gray-700/60 hover:text-white transition-colors ml-auto"
          onClick={() => signOut()}
        >
          <LogOut className="size-4 mr-1" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};
