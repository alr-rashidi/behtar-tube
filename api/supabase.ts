import { Database } from "@/types/supabase";
import { createClientComponentClient, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { SupabaseAuthClientOptions } from "@supabase/supabase-js/dist/module/lib/types";

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
      .insert({ subscribed_id: channelId });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.log("Subscribe failed: ", error);
  }
};

export const unsubscribeChannel = async (userId: string, channelId: string) => {
  try {
    const { error } = await supabase
      .from("subscribes")
      .delete()
      .eq("user_id", userId)
      .eq("subscribed_id", channelId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.log("Unsubscribe failed: ", error);
  }
};

export const checkSubscribed = async (userId: string, channelId: string) => {
  try {
    const { data, error } = await supabase
      .from("subscribes")
      .select()
      .eq("user_id", userId)
      .eq("subscribed_id", channelId)
      .single();

    if (error) {
      throw error;
    }
    return data ? true : false;
  } catch (error) {
    console.log("Check subscribe failed: ", error);
  }
};

export const getSubscribesList = async (userId: string, signal: AbortSignal) => {
  try {
    const { data, error } = await supabase
      .from("subscribes")
      .select()
      .abortSignal(signal)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log("Check subscribe failed: ", error);
  }
};

export const OAuthLogin = async (provider: Provider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.protocol}://${window.location.host}/auth/callback`,
      },
    });

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log("Oauth Login failed: ", error);
  }
};

export const emailLogin = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    supabase.auth.signInWithPassword({
      email,
      password,
    })
      .then(({ data, error }) => {
        if (data.user === null) {
          reject(error);
        } else {
          resolve(data);
        }
      })
      .catch(error => reject(error));
  });
};

export const createAccount = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.protocol}://${window.location.host}/account`,
        },
      },
    );

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log("Oauth Login failed: ", error);
  }
};
