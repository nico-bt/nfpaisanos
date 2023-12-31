"use client"
import { useState, Dispatch, SetStateAction, useContext } from "react"
import Link from "next/link"
import styles from "./styles.module.css"
import { UserContext } from "@/app/context/UserContext"
import Image from "next/image"

interface props {
  item: NFPAISANO
  setFilteredNfts: Dispatch<SetStateAction<NFPAISANO[]>>
}

export function Card({ item, setFilteredNfts }: props) {
  const { userLikes, setUserLikes } = useContext(UserContext)

  const [animateHeart, setAnimateHeart] = useState(false)

  const handleClickHeart = () => {
    new Audio("/heart.mp3").play()
    // Si no está likeado lo agrego, si está likeado lo saco del context
    setUserLikes((prev) => {
      if (prev.includes(item.id)) {
        return prev.filter((id) => id !== item.id)
      } else {
        return [...prev, item.id]
      }
    })

    setAnimateHeart(true)
    setTimeout(() => setAnimateHeart(false), 300)
  }

  return (
    <article className={styles.card}>
      <div className={styles.card_img_container}>
        <Image
          src={item.media.image}
          height={1333}
          width={1000}
          alt="imagen nft"
          sizes="(max-width: 559px) 100vw, (max-width: 831px) 50vw, (max-width: 1103px) 33vw, 260px"
        />
        <div className={styles.img_overlay}>
          <p>
            <span className={styles.type}>{item.attributes.type}</span>
            <span className={styles.heart} onClick={handleClickHeart}>
              {userLikes.includes(item.id) ? "❤️" : "🤍"}
            </span>
          </p>
          <Link href={`/nfts/${item.id}`} className="btn primary">
            Place a bid
          </Link>
        </div>
      </div>

      <div className={styles.card_body}>
        <div>
          <h2>{item.author}</h2>
          <p className={styles.card_price}>{item.instantPrice}</p>
        </div>

        <div>
          <div>
            {item.bidUsers.slice(0, 6).map((user) => (
              <Image key={user.id} src={user.avatar} alt="user bid avatar" height={24} width={24} />
            ))}
            {item.bidUsers.length > 6 && " . . ."}
          </div>
          <p className={styles.card_stock}>{item.stock} in stock</p>
        </div>

        <div className={styles.card_small_content}>
          {animateHeart ? (
            <>
              <p style={{ position: "absolute", fontSize: 22 }}>❤️ {item.likes}</p>
              <span> </span>
            </>
          ) : (
            <p>❤️ {item.likes}</p>
          )}

          <p>
            {new Date(item.createdAt).toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className={styles.card_footer}>
        <div className={styles.card_divider}></div>

        <div className={styles.card_small_content}>
          <p>
            Highest bid
            <span style={{ fontWeight: 600, color: "whitesmoke", marginLeft: 4 }}>
              {item.highestBid}
            </span>
          </p>
          <p>New bid 🔥</p>
        </div>
      </div>
    </article>
  )
}
