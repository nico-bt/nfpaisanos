import Logo from "../Navbar/Logo"
import styles from "./styles.module.css"

export default function PaisanosHero() {
  return (
    <section className={styles.hero}>
      <p>
        <Logo /> NFPaisanos
      </p>
      <p>The New Creative Economy</p>
    </section>
  )
}
