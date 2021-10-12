import styles from "./styles.module.scss";

interface ISubscribeButton {
  priceId: string;
}

export function SubscribeButton({}: ISubscribeButton) {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe
    </button>
  );
}
