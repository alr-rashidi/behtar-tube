"use client";

import { getProfilePictureURL } from "@/api/supabase";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";

type PropsType = {
  user: any;
};
const LoginBtn = ({ user }: PropsType) => {
  const router = useRouter();
  const [ProfilePicURL, setProfilePicURL] = useState<string>();

  useEffect(() => {
    const changeProfilePic = async () => {
      let url = await getProfilePictureURL(user.avatar_url!);
      setProfilePicURL(url);
    };
    changeProfilePic();
  }, [user.avatar_url]);

  return (
    <>
      {user
        ? (
          <Button
            className="flex flex-row items-center gap-1"
            onClick={() => router.push("/account")}
          >
            {ProfilePicURL
              ? (
                <Image
                  width={30}
                  height={30}
                  className="rounded-full"
                  src={ProfilePicURL}
                  alt="ProfilePic"
                />
              )
              : <MdOutlineAccountCircle className="w-6 h-6" />}
            <span className="text-sm md:text-base text-trim text-lines-1">{user.full_name}</span>
          </Button>
        )
        : (
          <Button
            className="flex flex-row items-center gap-1"
            onClick={() => router.push("/login")}
          >
            <MdOutlineAccountCircle className="w-6 h-6" />
            <span className="text-sm md:text-base">Login</span>
          </Button>
        )}
    </>
  );
};

export default LoginBtn;
