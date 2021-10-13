import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";
import { signIn, signOut, useSession } from "next-auth/client";

export function SignInButton() {
  const [session] = useSession();
  const isUserLoggedIn = session;

  return isUserLoggedIn ? (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#04d361" />
      Antonio Lucio
      <FiX color="#737380" onClick={() => signOut()} className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" onClick={() => signIn("github")} className={styles.signInButton}>
      <FaGithub color="#eba417" />
      Sign in with GitHub
    </button>
  );
}
