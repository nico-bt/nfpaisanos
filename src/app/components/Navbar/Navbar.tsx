import Link from "next/link"
import Logo from "./Logo"
import styles from "./styles.module.css"
import Burger from "./Burger"

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <span>
          <Link href="/">
            <Logo />
            <h1>NFPaisanos</h1>
          </Link>
        </span>
        <span className={styles.divider}></span>
        <ul>
          <li>Discover</li>
          <li>What we do</li>
        </ul>
      </div>
      <button className="btn secondary">Connect Wallet</button>

      <Burger />
    </nav>
  )
}
