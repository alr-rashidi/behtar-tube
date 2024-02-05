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
    console.log("Get user data failed: ", error);
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
    console.log("Update user data failed: ", error);
  }
};

export const RetrieveUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.log("Retrieve user failed: ", error);
  }
};

export const getProfilePictureURL = async (path: string) => {
  try {
    const { data, error } = await supabase.storage.from("avatars").download(path);
    if (error) {
      throw error;
    }
    const url = URL.createObjectURL(data);
    return url;
  } catch (error) {
    console.log("downloading image failed: ", error);
  }
};

export const deleteProfilePic = async (path: string) => {
  try {
    const { error } = await supabase
      .storage
      .from("avatars")
      .remove([path]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.log("Deleting image failed: ", error);
  }
};

export const subscribeChannel = async (channelId: string) => {
  try {
    const { error } = await supabase
      .from("subscribes")
      .insert({subscribed_id: channelId});

    if (error) {
      throw error;
    }
  } catch (error) {
    console.log("Deleting image failed: ", error);
  }
};
