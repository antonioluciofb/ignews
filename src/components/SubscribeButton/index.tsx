import { signIn, useSession } from "next-auth/client";
import { API } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface ISubscribeButton {
  priceId: string;
}

export function SubscribeButton({}: ISubscribeButton) {
  const [session] = useSession();

  const handleSubscribe = async () => {
    if (!session) {
      signIn("github");
    }

    try {
      const response = await API.post("/subscribe");

      const { sessionId } = response.data;

      const stripeJS = await getStripeJs();

      await stripeJS.redirectToCheckout({ sessionId });
    } catch (error) {
      alert("Error: " + error.message);
    }

    return null;
  };

  return (
    <button type="button" onClick={handleSubscribe} className={styles.subscribeButton}>
      Subscribe
    </button>
  );
}
