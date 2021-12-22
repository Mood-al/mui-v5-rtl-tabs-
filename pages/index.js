import { useRouter } from "next/dist/client/router";
import MatTabs from "../components/MatTabs";

import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae nemo
      voluptate dolor sit voluptatem optio repellendus, quos reprehenderit
      aliquid molestias saepe officia aspernatur adipisci? Fuga cumque esse
      deleniti nemo molestias.
      <MatTabs />
    </div>
  );
}
