"use server";
import { ImageGenerationFormSchema } from "@/components/image-generation/Configuration";
import { createClient } from "@/lib/supabase/server";
import Replicate from "replicate";
import { promise, z } from "zod";
import { Database } from "@datatypes.types";
import { imageMeta } from "image-meta";
import { randomUUID } from "crypto";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

interface ImageResponse {
  error: string | null;
  success: boolean;
  data?: unknown | null;
}

export async function generationImageAction(
  input: z.infer<typeof ImageGenerationFormSchema>
): Promise<ImageResponse> {
  const modelInput = {
    prompt: input.prompt,
    go_fast: true,
    megapixels: "1",
    prompt_strength: 0.8,
    aspect_ratio: input.aspect_ratio,
    guidance: input.guidance,
    num_outputs: input.num_outputs,
    output_quality: input.output_quality,
    num_inference_steps: input.num_inference_steps,
    output_format: input.output_format,
  };

  try {
    const output = await replicate.run(input.model as `${string}/${string}`, {
      input: modelInput,
    });
    return {
      error: null,
      success: true,
      data: output,
    };
  } catch (error: any) {
    return {
      error: error?.message || "An error occurred during image generation.",
      success: false,
      data: null,
    };
  }
}

export async function imgUrlToBlob(url: string) {
  const response = fetch(url);
  const blob = (await response).blob();
  return (await blob).arrayBuffer();
}

type storeImageInput = {
  url: string;
} & Database["public"]["Tables"]["generated_images"]["Insert"];

export async function storeImages(data: storeImageInput[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "unauthorize",
      success: false,
      data: null,
    };
  }

  const uploadResults = [];
  for (const img of data) {
    const arrayBuffer = await imgUrlToBlob(img.url);
    const { width, height, type } = imageMeta(new Uint8Array(arrayBuffer));
    const fileName = `image_${randomUUID()}.${type}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: storageError } = await supabase.storage
      .from("generated-images")
      .upload(filePath, arrayBuffer, {
        contentType: `image/${type}`,
        cacheControl: "3600",
        upsert: false,
      });
    if (storageError) {
      uploadResults.push({
        fileName,
        error: storageError.message,
        success: false,
        data: null,
      });
      continue;
    }

    const { data: dbData, error: dbError } = await supabase
      .from("generated_images")
      .insert([
        {
          user_id: user.id,
          model: img.model,
          prompt: img.prompt,
          aspect_ratio: img.aspect_ratio,
          guidance: img.guidance,
          num_inference_steps: img.num_inference_steps,
          output_format: img.output_format,
          image_name: fileName,
          width,
          height,
        },
      ])
      .select();
    if (dbError) {
      uploadResults.push({
        fileName,
        error: dbError.message,
        success: !dbError,
        data: dbData || null,
      });
    }
  }
  console.log("uploadResult:", uploadResults);
  return {
    error: null,
    success: true,
    data: { results: uploadResults },
  };
}

export async function getImages(limit?: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "unauthorize",
      success: false,
      data: null,
    };
  }

  let query = supabase
    .from("generated_images")
    .select("*")
    .eq("user_id", user.id)
    .order("created at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data: images, error } = await query;
  if (error) {
    return {
      error: error.message || "failed to fetch image!",
      success: false,
      data: null,
    };
  }

  const imageWithUrl = await Promise.all(
    images.map(
      async (
        image: Database["public"]["Tables"]["generated_images"]["Row"]
      ) => {
        const { data: signedUrlData } = await supabase.storage
          .from("generated-images")
          .createSignedUrl(`${user.id}/${image.image_name}`, 3600);
        return {
          ...image,
          url: signedUrlData?.signedUrl,
        };
      }
    )
  );

  return {
    error: null,
    success: true,
    data: imageWithUrl || null,
  };
}

export async function deleteImages(id: string, imageName:string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "unauthorize",
      success: false,
      data: null,
    };
  }



  const { data, error } = await supabase
    .from("generated_images")
    .delete()
    .eq("id", id);

  await supabase.storage.from('generate-images').remove([`${user.id}/${imageName}`])

  if (error) {
    return { error: error.message, success: false, data: null };
  }
  return {
    error: null,
    success: true,
    data: data,
  };
}
