import { Database } from "@/types/supabase";
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient<Database>();

export const getUserData = async (user: User | null) => {
  try {
    const { data, error, status } = await supabase
      .from("profiles")
      .select(`full_name, username, avatar_url`)
      .eq("id", user!.id)
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
}
export const updateUserData = async (newUser: UpdateUserType) => {
  newUser.updated_at = new Date().toISOString();

  console.log(newUser);
  

  const { error } = await supabase
    .from("profiles")
    .upsert(newUser)
    if (error) throw error;
    return  "Successfully Updated!";
};
