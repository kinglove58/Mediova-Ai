"use client";
import React from "react";
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

const formSchema = z.object({
  model: z.string({
    required_error: "model is required",
  }),
  prompt: z.string({
    required_error: "prompt is required",
  }),
  aspect_ratio: z.string({
    required_error: "Aspect ratio is required",
  }),
  guidance: z.number({
    required_error: "guidance scale is required",
  }),
  num_outputs: z
    .number()
    .min(1, { message: "Number of output should be atleast 1" })
    .max(4, { message: "Number of output must be less than 4" }),
  output_quality: z
    .number()
    .min(1, { message: "output quality should be atleast 1" })
    .max(100, { message: "output quality must be less than 100" }),
  num_inference_steps: z
    .number()
    .min(1, { message: "Number of influence should be atleast 1" })
    .max(50, { message: "Number of influence must be less than 100" }),
  output_format: z.string({ required_error: "Output format is required" }),
});
const Configuration = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "black-forest-labs/flux-schnell",
      prompt: "",
      aspect_ratio: "1.1",
      guidance: 3.5,
      num_outputs: 1,
      output_quality: 80,
      num_inference_steps: 28,
      output_format: "jpg",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Configuration;
