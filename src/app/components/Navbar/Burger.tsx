"use client"
import { useState } from "react"
import styles from "./styles.module.css"

export default function Burger() {
  const [showMenu, setShowMenu] = useState(false)

  const handleClick = () => {
    setShowMenu((prev) => !prev)
  }

  return (
    <div className={styles.burger}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        onClick={handleClick}
      >
        <path
          d="M6.66665 10.6667C5.93027 10.6667 5.33331 11.2637 5.33331 12.0001C5.33331 12.7365 5.93027 13.3334 6.66665 13.3334H25.3333C26.0697 13.3334 26.6666 12.7365 26.6666 12.0001C26.6666 11.2637 26.0697 10.6667 25.3333 10.6667H6.66665Z"
          fill="#777E91"
        />
        <path
          d="M6.66665 18.6667C5.93027 18.6667 5.33331 19.2637 5.33331 20.0001C5.33331 20.7365 5.93027 21.3334 6.66665 21.3334H25.3333C26.0697 21.3334 26.6666 20.7365 26.6666 20.0001C26.6666 19.2637 26.0697 18.6667 25.3333 18.6667H6.66665Z"
          fill="#777E91"
        />
      </svg>

      {showMenu && (
        <>
          <ol className={styles.burger_menu}>
            <li>Discover</li>
            <li>What we do</li>
            <li className="btn secondary">Connect Wallet</li>
          </ol>
        </>
      )}
    </div>
  )
}
