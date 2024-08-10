"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import { messageSchema } from "@/schema/messageSchema";
import { useParams } from "next/navigation";
import axios from "axios";

const FeedbackPage = () => {
  const [check, setCheck] = useState(true);
  const { username } = useParams();
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });
  const messages = [
    "Whats your favorite movie?",
    "Do you have any questions?",
    "Whats your favorite food?",
  ];
  useEffect(() => {}, []);

  async function onSubmit(data: z.infer<typeof messageSchema>) {
    try {
      const response = await axios.post("/api/send-messages", {
        content: data.content,
        username,
      });
      toast({
        title: response.data.message,
      });
    } catch (error) {
      console.log(error);
      toast({
        title:"user is not accepting messages",
      });
    }
  }
  return (
    <div className="flex justify-center">
      <div className="w-[886px]">
        <p className="text-xl font-semibold py-5">
          Send Anonymous Messages to @hc
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="h-16"
                      placeholder="write your anonymous message here"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {/* {check ? (
                      <p className="text-sm text-red-400">
                        user are not accepting messages right now
                      </p>
                    ) : (
                      ""
                    )} */}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Send it</Button>
          </form>
        </Form>
        <Button className="py-5 mt-10" type="submit">
          Suggest Messages
        </Button>
        <p className="text-lg font-normal py-5">
          Click on any message below to select it
        </p>
        <p className="text-2xl font-bold py-2">Messages</p>
        <div className=" text-center">
          {messages.map((message) => {
            return (
              <p
                key={message}
                className="py-4 m-2 ring-1 cursor-pointer ring-gray-400"
              >
                {message}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
