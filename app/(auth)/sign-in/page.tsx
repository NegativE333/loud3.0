"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
            toast("Incorrect email or password");
        }
        
        if(result?.url){
            router.replace("/");
        }
        
        setIsSubmitting(false);
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] bg-white bg-opacity-30 p-10 rounded-md shadow-md">
                <h1 className="text-center text-3xl mb-6 text-gray-700">
                    Feel <b className="text-gray-800">loud</b>
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <Mail />
                            </span>
                            <input 
                                type="email" 
                                className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
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
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <Lock />
                            </span>
                            <input 
                                type="password" 
                                className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="******" 
                                onChange={(e) => setFormData((prev) => ({
                                    ...prev, password: e.target.value
                                }))}
                            />
                        </div>
                    </div>
                    <Button disabled={isSubmitting}>
                        {isSubmitting ? (
                            <Loader2 className="animate-spin"/>
                        ) : (
                            <>
                                Sign In
                            </>
                        )}
                    </Button>
                </form>
                <div className="mt-6 text-sm text-center text-muted-foreground">
                    New to loud? <Link href="/sign-up" className="text-black underline">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}