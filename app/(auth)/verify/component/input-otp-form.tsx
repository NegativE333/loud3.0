"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import axios from "axios"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Verification code must be 6 digits.",
  }),
})

type Props = {
    email : string;
}

export default function InputOTPForm ({
    email
}: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const [isValidating, setIsValidating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  },[]);

  if(!isMounted) return null;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsValidating(true);
    try{
        const d = await axios.post('/api/verify-code', {
            email,
            code: data.pin
        });

        if(d.status === 200){   
            router.push("/sign-in");
        }
    }
    catch(error: any){
        toast.error(error.response.data.message);
    }
    setIsValidating(false);
  }

  return (
    <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] bg-white bg-opacity-70 p-10 rounded-md shadow-md flex flex-col items-center justify-center gap-8">
        <Form {...form}>
            <h1 className="text-2xl text-gray-700 font-semibold">
                Verify Email
            </h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col justify-center items-center text-center">
            <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <div className="flex items-center justify-center">
                        <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        {/* <InputOTPSeparator /> */}
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={4} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                        </InputOTP>
                    </div>
                </FormControl>
                <FormDescription className="flex flex-col gap-3 pt-4 text-gray-700">
                    <p>
                        Please enter the verification code sent to <span className="underline">
                            {email}
                        </span>
                        .
                    </p>
                    <p>
                        Verification password is valid for 1 hour.
                    </p>
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />

            <Button 
                type="submit"
                disabled={isValidating}
                className="bg-white/30 shadow-sm hover:bg-white/50 text-black w-20"
            >
                {isValidating ? (
                    <Loader2 className="animate-spin"/>
                ) : (
                    <>
                        Verify
                    </>
                )}
            </Button>
        </form>
        </Form>
    </div>
  )
}
