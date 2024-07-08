"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { AudioLines, Loader2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SingUp() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = await axios.post('/api/sign-up', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            })

            if (data.status === 200) {
                router.push(`/verify/${formData.email}`);
            }
        }
        catch (error) {
            toast.error("Email already exists.", {
                position: "bottom-left",
                className: "bg-white/90 flex items-center gap-2 w-fit left-[10%] text-red-600",
                icon: <AudioLines className="size-5 text-red-400" />
            });
        }
        setIsSubmitting(false);
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] bg-white bg-opacity-30 p-10 rounded-md shadow-md">
                <h1 className="text-center text-3xl mb-6 text-gray-700">
                    Be <b className="text-gray-800">loud</b>
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <div>
                        <label 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Name
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-cyan-300/20 border rounded-e-0 border-cyan-300/80 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <User />
                            </span>
                            <input 
                                type="text" 
                                className="rounded-none rounded-e-lg bg-gray-50/95 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="abc" 
                                onChange={(e) => setFormData((prev) => ({
                                    ...prev, name: e.target.value
                                }))}    
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-cyan-300/20 border rounded-e-0 border-cyan-300/80 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <Mail />
                            </span>
                            <input 
                                type="email" 
                                className="rounded-none rounded-e-lg bg-gray-50/95 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" 
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
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-cyan-300/20 border rounded-e-0 border-cyan-300/80 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <Lock />
                            </span>
                            <input 
                                type="password" 
                                className="rounded-none rounded-e-lg bg-gray-50/95 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="******" 
                                onChange={(e) => setFormData((prev) => ({
                                    ...prev, password: e.target.value
                                }))}
                            />
                        </div>
                    </div>
                    <div
                        className="flex w-full items-center justify-center mt-2"
                    >
                        <Button
                            className="bg-white/30 shadow-sm hover:bg-white/50 text-black w-20" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="animate-spin"/>
                            ) : (
                                <>
                                    Sign Up
                                </>
                            )}
                        </Button>
                    </div>
                </form>
                <div className="mt-6 text-sm text-center text-muted-foreground">
                    Already have an account? <Link href="/sign-in" className="text-black underline">Sign In</Link>
                </div>
            </div>
        </div>
    )
}