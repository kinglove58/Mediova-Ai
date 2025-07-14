"use server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function getPresignedStorageUrl(
  filePath: string,
  userId?: string
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fileName = `${userId}/${Date.now()}_${filePath}`;
  const { data: urlData, error } = await supabaseAdmin.storage
    .from("training-data")
    .createSignedUploadUrl(fileName); // URL valid for 5 minutes

  return {
    signedUrl: urlData?.signedUrl || "",
    error: error?.message || "",
  };
}
