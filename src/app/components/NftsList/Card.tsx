"use client"
import { useState, Dispatch, SetStateAction } from "react"
import Link from "next/link"
import styles from "./styles.module.css"

interface props {
  item: NFPAISANO
  setFilteredNfts: Dispatch<SetStateAction<NFPAISANO[]>>
}

export function Card({ item, setFilteredNfts }: props) {
  const [liked, setLiked] = useState(false)
  const [animateHeart, setAnimateHeart] = useState(false)

  const handleClickHeart = () => {
    new Audio("/heart.mp3").play()
    setLiked((prev) => !prev)
    setAnimateHeart(true)
    setTimeout(() => setAnimateHeart(false), 300)
  }

  return (
    <article className={styles.card}>
      <div className={styles.card_img_container}>
        <img src={item.media.image} alt="imagen nft" />
        <div className={styles.img_overlay}>
          <p>
            <span className={styles.type}>{item.attributes.type}</span>
            <span className={styles.heart} onClick={handleClickHeart}>
              {liked ? "❤️" : "🤍"}
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
              <img key={user.id} src={user.avatar} alt="user bid avatar" height={24} width={24} />
            ))}
            {item.bidUsers.length > 6 && " . . ."}
          </div>
          <p className={styles.card_stock}>{item.stock} in stock</p>
        </div>

        <div className={styles.card_small_content}>
          {animateHeart && liked ? (
            <>
              <p style={{ position: "absolute", fontSize: 22 }}>❤️ {item.likes + +liked}</p>
              <span> </span>
            </>
          ) : (
            <p>❤️ {item.likes + +liked}</p>
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
