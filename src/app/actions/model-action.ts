"use server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getPresignedStorageUrl(
  filePath: string,
  userId?: string
) {
  const fileName = `${userId}/${Date.now()}_${filePath}`;
  const { data: urlData, error } = await supabaseAdmin.storage
    .from("training-data")
    .createSignedUrl(fileName, 60 * 5); // URL valid for 5 minutes

  return {
    signedUrl: urlData?.signedUrl || "",
    error: error?.message || "",
  };
  if (error) {
    throw error;
  }
}
