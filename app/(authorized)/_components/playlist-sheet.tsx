import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarOptions } from "./sidebar-options";
import { usePathname, useRouter } from "next/navigation";
import { UserActionsBtn } from "./user-actions-btn";

type Props = {
  children: React.ReactNode;
};

export const PlayListSheet = ({ children }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="bg-gradient-to-bl from-[#020617] via-[#0F172A] to-[#1E293B]/90 border-none px-3 py-6">
        <SheetHeader>
          <SheetTitle className="text-white font-semibold">
            Play Lists
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex flex-col items-start gap-3 text-gray-200">
          <SheetClose className="border-none outline-none focus:outline-none w-full">
            <SidebarOptions title="All Tracks" path="/" />
          </SheetClose>
          <SheetClose>
            <SidebarOptions title="Throwback Tunes" path="/throwbackTunes" />
          </SheetClose>
          <SheetClose>
            <SidebarOptions title="Global Hits" path="/globalhits" />
          </SheetClose>
          <SheetClose>
            <SidebarOptions title="Party Starters" path="/partystarters" />
          </SheetClose>
          <SheetClose>
            <SidebarOptions title="Love Ballads" path="/loveballads" />
          </SheetClose>
          <SheetClose>
            <SidebarOptions title="Your favourites" path="/favourite" />
          </SheetClose>
        </div>
        <SheetFooter className="w-full flex items-center justify-center h-full pb-10">
          <SheetClose>
            <UserActionsBtn />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
