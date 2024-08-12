"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
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
  const [suggest, setSuggest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
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
        title: "user is not accepting messages",
      });
    }
  }
  const HandleSuggestFunction = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/suggest-messages");
      const res = response.data.text.split("||");
      setSuggest(res);
      console.log(res);
      toast({
        title: response.data.text,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSelection = (id: number) => {
    const getValue = suggest.find((item, index) => index === id);
    setContent(getValue);
  };

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
                      value={content}
                      // {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Send it</Button>
          </form>
        </Form>
        <Button
          className="py-5 mt-10"
          type="submit"
          onClick={HandleSuggestFunction}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : ""} Suggest
          Messages
        </Button>
        <p className="text-lg font-normal py-5">
          Click on any message below to select it
        </p>
        <p className="text-2xl font-bold py-2">Messages</p>
        <div className=" text-center">
          {suggest.length > 0
            ? suggest?.map((message, index) => {
                return (
                  <p
                    key={index}
                    className="py-4 m-2 ring-1 cursor-pointer ring-gray-400"
                    onClick={() => handleSelection(index)}
                  >
                    {message}
                  </p>
                );
              })
            : messages?.map((message, index) => {
                return (
                  <p
                    key={index}
                    className="py-4 m-2 ring-1 cursor-pointer ring-gray-400"
                    onClick={() => handleSelection(index)}
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
