import { ActiveLink } from "../ActiveLink";
import { SignInButton } from "../SignInButton";

import styles from "./styles.module.scss";

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news Logo" />
        <nav>
          <ActiveLink 
          activeClassName={styles.active} 
          href="/" text="Home" 
          />
          <ActiveLink
            activeClassName={styles.active}
            href="/posts"
            text="Posts"
          />
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
