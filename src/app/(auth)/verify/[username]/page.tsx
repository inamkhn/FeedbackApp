"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifySchema } from "@/schema/verifySchema";
import Link from "next/link";
import { useParams } from "next/navigation";

const VerifyOTP = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");
  const { username } = useParams();

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof verifySchema>) {
    try {
      setIsSubmitting(true);
      const response = await axios.post<ApiResponse>("/api/verify-code", {
        username: username,
        code: values.code,
      });
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace("/sign-in");
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error during verify code:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ("There was a problem with your verify code. Please try again.");
      toast({
        title: "Verify Code Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
    console.log(values);
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Verify</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOTP;
