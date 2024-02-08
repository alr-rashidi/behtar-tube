"use client";

import { ErrorCard } from "@/components/cards";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { User } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import { getUserData, updateUserData } from "@/api/supabase";
import Avatar from "./avatar";

export default function AccountForm({ user }: { user: User | null }) {
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getUserData(user!.id);

      if (data) {
        setFullName(data.full_name);
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

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
    setLoading(true);
    updateUserData({
      id: user?.id as string,
      full_name: fullName,
      username,
      avatar_url,
      updated_at: new Date().toISOString(),
    }).then(() => alert("Profile updated!"))
      .catch((data) => alert("Error updating the data!"+ JSON.stringify(data)));
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <Avatar
        uid={user!.id}
        path={avatar_url}
        size={80}
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
          <Button className="w-full" Theme="red" type="submit">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}
