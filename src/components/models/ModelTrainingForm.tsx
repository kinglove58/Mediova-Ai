"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

import React from "react";

const ACCEPTED_ZIP_FILES = ["application/x-zip-compressed", "application/zip"];
const MAX_FILE_SIZE = 45 * 1024 * 1024;

const formSchema = z.object({
  modelName: z.string({ required_error: "model name is require" }),
  gender: z.enum(["man", "woman"]),
  zipfile: z
    .any()
    .refine((file) => file?.[0] instanceof File, "please select a valid file")
    .refine(
      (file) => file?.[0]?.type && ACCEPTED_ZIP_FILES.includes(file?.[0]?.type)
    )
    .refine(
      (file) => file?.[0]?.size <= MAX_FILE_SIZE,
      "max file size allowed is 45mb"
    ),
});

const ModelTrainingForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelName: "",
      gender: "man",
      zipfile: "undefined",
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
        <fieldset className="grid bg-background max-w-5xl p-8 rounded-lg gap-6">
          <FormField
            control={form.control}
            name="modelName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your model name" {...field} />
                </FormControl>
                <FormDescription>
                  This will be the name of your train model.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>please select the gender of the image</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col"
                  >
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="man" />
                      </FormControl>
                      <FormLabel className="font-normal">male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="woman" />
                      </FormControl>
                      <FormLabel className="font-normal">female </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default ModelTrainingForm;
