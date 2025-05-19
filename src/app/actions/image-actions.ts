"use server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

interface ImageResponse {
  error: string | null;
  success: boolean;
  data: unknown | null;
}
