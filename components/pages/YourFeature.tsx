import { F } from 'i18n';
import styles from './your-feature.module.css';

export default function YourFeature() {
  return (
    <main className={styles.main}>
      <h2 className={styles.title}>
        <F defaultMessage="Your Feature" />
      </h2>
      <ul className={styles.list}>
        <li>
          <a href="/">
            <F defaultMessage="Go back" />
          </a>
        </li>
      </ul>
    </main>
  );
}
