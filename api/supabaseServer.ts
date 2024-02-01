import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerComponentClient<Database>({ cookies });

export const getUserData = async (userId: string) => {
  try {
    const { data, error, status } = await supabase
      .from("profiles")
      .select()
      .eq("id", userId)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return data;
    }
  } catch (error) {
    throw error;
  }
};