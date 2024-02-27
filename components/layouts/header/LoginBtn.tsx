"use client";

import { getProfilePictureURL } from "@/api/supabase";
import { getUserData } from "@/api/supabase";
import Button from "@/components/ui/Button";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";

type PropsType = {
  user: any;
};
const supabase = createClientComponentClient<Database>();
const LoginBtn = ({}: PropsType) => {
  const router = useRouter();
  const [ProfilePicURL, setProfilePicURL] = useState<string>();
  const [user, setUser] = useState<Database["public"]["Tables"]["profiles"]["Row"]>();

  useEffect(() => {
    const checkLogin = async () => {
      const {
        data: { user: userAuth },
      } = await supabase.auth.getUser();

      let userInfo: Database["public"]["Tables"]["profiles"]["Row"] | undefined;
      if (userAuth) {
        setUser(await getUserData(userAuth!.id));
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (user) {
      const changeProfilePic = async () => {
        let url = await getProfilePictureURL(user.avatar_url!);
        setProfilePicURL(url);
      };
      changeProfilePic();
    }
  }, [user]);

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
