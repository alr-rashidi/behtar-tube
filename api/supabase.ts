import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient<Database>();

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

type UpdateUserType = {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  updated_at: string;
};
export const updateUserData = async (newUser: UpdateUserType) => {
  try {
    newUser.updated_at = new Date().toISOString();

    const { error } = await supabase
      .from("profiles")
      .upsert(newUser)
      .select();
    if (error) throw error;
    return "Successfully Updated!";
  } catch (error) {
    throw error;
  }
};

export const RetrieveUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    throw error;
  }
};
