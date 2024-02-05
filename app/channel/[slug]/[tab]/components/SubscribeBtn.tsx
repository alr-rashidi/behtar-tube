"use client";

import { subscribeChannel } from "@/api/supabase";
import Button from "@/components/ui/Button";
import React, { useState } from "react";

type PropsType = {
  channelId: string;
};
const SubscribeBtn = ({ channelId }: PropsType) => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSub = () => {
    subscribeChannel(channelId)
      .then(() => alert("OK"))
      .catch(err => alert("Error:" + JSON.stringify(err)));
  };
  return <Button 
  Theme={subscribed ? undefined : "sharp"}
  className="!p-3"
  onClick={handleSub}>
    {subscribed ? "Subscribed" : "Subscribe" }
  </Button>;
};

export default SubscribeBtn;
