import { SessionContextValue, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";

import styles from "./styles.module.scss";

type SubscribeResponse = {
  sessionId: string;
};

type SessionResponse = SessionContextValue & {
  data: {
    activeSubscription: object
  };
};

export function SubscribeButton() {
  const session = useSession() as SessionResponse;
  const router = useRouter();

  const handleSubscribe = async () => {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.data?.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const { data } = await api.post<SubscribeResponse>("/subscribe");

      const { sessionId } = data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
