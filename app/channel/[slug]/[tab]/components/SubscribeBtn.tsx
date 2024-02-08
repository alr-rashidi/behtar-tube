"use client";

import { checkSubscribed, subscribeChannel, unsubscribeChannel } from "@/api/supabase";
import Button from "@/components/ui/Button";
import React, { useCallback, useEffect, useState } from "react";

type PropsType = {
  userId: string;
  channelId: string;
};
const SubscribeBtn = ({ userId, channelId }: PropsType) => {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCheckSubscribe = useCallback(() =>
    checkSubscribed(userId, channelId)
      .then((result) => setSubscribed(result!))
      .catch(err => {
        throw err;
      })
      .finally(() => setLoading(false)), [userId, channelId]);

  useEffect(() => {
    handleCheckSubscribe();
  }, [userId, channelId, handleCheckSubscribe]);

  const handleSub = async () => {
    if (!subscribed) {
      await subscribeChannel(channelId)
        .catch(err => alert("Sub failed:" + JSON.stringify(err)));
    } else {
      await unsubscribeChannel(userId, channelId)
        .catch(err => alert("UnSub failed:" + JSON.stringify(err)));
    }
    handleCheckSubscribe();
  };
  return (
    <Button
      Theme={subscribed ? undefined : "sharp"}
      className="!p-3"
      onClick={handleSub}
      disabled={loading}
    >
      {loading
        ? "Loading..."
        : subscribed
        ? "Subscribed"
        : "Subscribe"}
    </Button>
  );
};

export default SubscribeBtn;
