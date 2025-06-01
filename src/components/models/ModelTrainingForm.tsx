"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

  return <div>ModelTrainingForm</div>;
};

export default ModelTrainingForm;
