"use server";
import { ImageGenerationFormSchema } from "@/components/image-generation/Configuration";
import Replicate from "replicate";
import { z } from "zod";

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
