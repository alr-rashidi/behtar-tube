"use client";
import { deleteProfilePic, getProfilePictureURL } from "@/api/supabase";
import Button from "@/components/ui/Button";
import { Database, UserType } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdOpenInBrowser, MdOpenInNew, MdOutlineAccountCircle, MdUpload } from "react-icons/md";
type Profiles = UserType;

export default function Avatar({
  uid,
  path,
  size,
  onUpload,
}: {
  uid: string;
  path: Profiles["avatar_url"];
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClientComponentClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const url = await getProfilePictureURL(path);
        setAvatarUrl(url!);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (path) downloadImage(path);
  }, [path, supabase]);

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
    await deleteProfilePic(path!);
    alert("Profile Picture Deleted!");
  };

  return (
    <div className="flex flex-col gap-1">
      <div>Profile Image:</div>
      <div className="flex flex-row items-center gap-3 ">
        {avatarUrl
          ? (
            <Link href={avatarUrl} className="relative" target="_blank">
              <Image
                width={size}
                height={size}
                src={avatarUrl}
                alt="Avatar"
                className="rounded-full peer"
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center rounded-full bg-white dark:bg-black transition-all peer-hover:opacity-80 opacity-0">
                <MdOpenInNew className="w-8 h-8" />
              </div>
            </Link>
          )
          : <div className={`bg-neutral-200 dark:bg-neutral-800 rounded-full w-20 h-20`} />}
        <label className="cursor-pointer rounded-lg" htmlFor="single">
          {uploading ? "Uploading ..." : (
            <Button className="flex flex-row gap-0.5 items-center p-1">
              <MdUpload className="w-4 h-4" /> Upload
            </Button>
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
        <Button
          onClick={deleteProfilePicFunction}
          Theme="red"
          className="flex flex-row p-1 gap-0.5 items-center cursor-pointer"
        >
          <MdDelete className="w-4 h-4" /> Delete
        </Button>
      </div>
    </div>
  );
}
