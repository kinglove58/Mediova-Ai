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

import React, { useId } from "react";
import { getPresignedStorageUrl } from "@/app/actions/model-action";

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
  const toastId = useId();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelName: "",
      gender: "man",
      zipfile: "undefined",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("uploading...", { id: toastId });

    try {
      const data = await getPresignedStorageUrl(values.zipfile[0].name);

      if (data.error) {
        toast.error(data.error || "failed to upload the file ", {
          id: toastId,
        });
        return;
      }

      //uploading file
      const urlResponse = await fetch(data.signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": values.zipfile[0].type,
        },
        body: values.zipfile[0],
      });

      if (!urlResponse.ok) {
        throw new Error("upload failed");
      }
      const res = await urlResponse.json();
      toast.success("successfull uploaded", { id: toastId });

      const formData = new FormData();
      formData.append("modelName", values.modelName);
      formData.append("zipfile", values.zipfile);
      formData.append("gender", values.gender);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "failed to training";
      toast.error(errorMessage, { id: toastId, duration: 5000 });
    }
  }

  const fileRef = form.register("zipfile");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <fieldset className="grid bg-background max-w-5xl p-8 rounded-lg gap-6 border">
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
          <FormField
            control={form.control}
            name="zipfile"
            render={() => (
              <FormItem>
                <FormLabel>
                  Training data (zip file) |{" "}
                  <span className="text-destructive">
                    Read the rquirement below
                  </span>{" "}
                  <div className="mb-4 rounded-lg shadow-sm pb-4 text-card-foreground">
                    <ul className="list-disc space-y-2 text-sm text-muted-foreground">
                      <li>Provide 10, 12 or 15 images in total</li>
                      <li>
                        Ideal breakdown for 12 images:
                        <ul className="list-disc ml-3 mt-1 space-y-1">
                          <li>6 face closeups</li>
                          <li>3/4 half body closeups (till stomach)</li>
                          <li>2/3 full body shots</li>
                        </ul>
                      </li>
                      <li>No accessories on face/head ideally</li>
                      <li>No other people in images</li>
                      <li>
                        Different expressions, clothing, backgrounds with good
                        lighting
                      </li>
                      <li>
                        Images to be in 1:1 resolution (1048x1048 or higher)
                      </li>
                      <li>
                        Use images of similar age group (ideally within past few
                        months)
                      </li>
                      <li>Provide only zip file (under 45MB size)</li>
                    </ul>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input type="file" accept=".zip" {...fileRef} />
                </FormControl>
                <FormDescription>upload your zip file</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-fit">
            Submit
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default ModelTrainingForm;
