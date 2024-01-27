"use client";
import { ErrorCard } from "@/components/cards";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { Database } from "@/types/supabase";
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import Avatar from "./avatar";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, avatar_url`)
        .eq("id", user!.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullName(data.full_name);
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: string | null;
    fullName: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullName,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  if (user == null) {
    return (
      <ErrorCard
        title="User doesn't exist!"
        body="Sign in if you are not logged in, if not you can try again"
        tryBtn={false}
      />
    );
  } else {
    console.log(user);
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <Avatar
        uid={user.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullName, username, avatar_url: url });
        }}
      />
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <TextInput id="email" type="text" value={user?.email} disabled />
      </div>
      <div className="flex flex-col">
        <label htmlFor="fullName">Full Name</label>
        <TextInput
          id="fullName"
          type="text"
          value={fullName || ""}
          onChange={(e: any) => setFullName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <TextInput
          id="username"
          type="text"
          value={username || ""}
          onChange={(e: any) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-row h-10 p-1 gap-2">
        <Button
          className="w-full"
          onClick={() => updateProfile({ fullName, username, avatar_url })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
        <form action="/auth/signout" className="w-full" method="post">
          <Button className="w-full bg-transparent dark:bg-red-900" type="submit">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}
