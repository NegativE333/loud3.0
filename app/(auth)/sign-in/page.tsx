"use client";

import { Button } from "@/components/ui/button";
import { AudioLines, Loader2, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Mulish } from "next/font/google";
import { cn } from "@/lib/utils";

const content = Mulish({subsets: ['latin']});

export default function SignIn() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
        })

        if(result?.error){
            toast.error("Incorrect email or password", {
                position: "bottom-left",
                className: "bg-white/90 flex items-center gap-2 w-fit left-[10%] text-red-600",
                icon: <AudioLines className="size-5 text-red-400" />
            });
        }
        
        if(result?.url){
            router.replace("/");
        }
        
        setIsSubmitting(false);
    }

    return (
        <div className={cn("flex items-center justify-center h-full animate-slidein opacity-0 [--slidein-delay:100ms]", content.className)}>
            <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] p-5 md:p-10 rounded-md shadow-md">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-cyan-300/20 border rounded-e-0 border-cyan-300/50 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <Mail />
                            </span>
                            <input 
                                required
                                type="email" 
                                className="rounded-none rounded-e-lg bg-gray-50/95 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="abc@gmail.com" 
                                onChange={(e) => setFormData((prev) => ({
                                    ...prev, email: e.target.value
                                }))}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Password
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-cyan-300/20 border rounded-e-0 border-cyan-300/50 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <Lock />
                            </span>
                            <input 
                                required
                                type="password" 
                                className="rounded-none rounded-e-lg bg-gray-50/95 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="******" 
                                onChange={(e) => setFormData((prev) => ({
                                    ...prev, password: e.target.value
                                }))}
                            />
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center mt-2">
                        <Button 
                            className="text-muted-foreground w-20 bg-transparent hover:bg-transparent rounded-full border-muted-foreground border hover:text-black hover:border-black"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="animate-spin"/>
                            ) : (
                                <>
                                    Sign In
                                </>
                            )}
                        </Button>
                    </div>
                </form>
                <div className="mt-6 text-sm text-center text-muted-foreground">
                    New to loud? <Link href="/sign-up" className="text-black underline">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}