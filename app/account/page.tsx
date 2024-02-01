import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AccountForm from "./account-form";
import { ErrorCard } from "@/components/cards";

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user == null) {
    return (
      <ErrorCard
        title="User doesn't exist!"
        body="Sign in if you are not logged in, if not you can try again"
        tryBtn={false}
      />
    );
  } else {
    return <AccountForm user={user} />;
  }
}
