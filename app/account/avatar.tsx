"use client";
import { deleteProfilePic } from "@/api/supabase";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdDelete, MdUpload } from "react-icons/md";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string;
  url: Profiles["avatar_url"];
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClientComponentClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from("avatars").download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  const deleteProfilePicFunction = async () => {
    await deleteProfilePic(url!);
    alert("Profile Picture Deleted!")
  }

  return (
    <div className="flex flex-col gap-1">
      <div>Profile Image:</div>
      <div className="flex flex-row items-center gap-5 ">
        {avatarUrl
          ? (
            <Image
              width={size}
              height={size}
              src={avatarUrl}
              alt="Avatar"
              className="rounded-full"
            />
          )
          : <div className={`bg-slate-200 dark:bg-slate-800 rounded-full w-20 h-20`} />}
        <label className="cursor-pointer hover:underline rounded p-1" htmlFor="single">
          {uploading ? "Uploading ..." : (
            <div className="flex flex-row gap-0.5 items-center">
              <MdUpload className="w-4 h-4" /> Upload
            </div>
          )}
        </label>
        <input
          className="hidden absolute"
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
        <button onClick={deleteProfilePicFunction} className="flex flex-row gap-0.5 items-center cursor-pointer hover:underline">
          <MdDelete className="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
  );
}
