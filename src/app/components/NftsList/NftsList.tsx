"use client"
import { useEffect, useState } from "react"
import FilterBar from "./FilterBar"
import Link from "next/link"
import styles from "./styles.module.css"

export default function NftsList({ nfts }: { nfts: NFPAISANO[] }) {
  const [filteredNfts, setFilteredNfts] = useState(nfts)

  useEffect(() => {
    if (filteredNfts.length == 0) {
      new Audio("/no_items.mp3").play()
    }
  }, [filteredNfts])

  return (
    <>
      <FilterBar setFilteredNfts={setFilteredNfts} nfts={nfts} />

      <section className={styles.nfts_container}>
        {filteredNfts.length > 0 ? (
          filteredNfts.map((item) => <Card key={item.id} item={item} />)
        ) : (
          <h1 style={{ gridColumn: "1/-1", textAlign: "center", marginTop: 100, height: 350 }}>
            No items match the selected filters
          </h1>
        )}
      </section>
    </>
  )
}

function Card({ item }: { item: NFPAISANO }) {
  const [liked, setLiked] = useState(false)

  return (
    <article className={styles.card}>
      <div className={styles.card_img_container}>
        <img src={item.media.image} alt="imagen nft" />
        <div className={styles.img_overlay}>
          <p>
            <span className={styles.type}>{item.attributes.type}</span>
            <span
              className={styles.heart}
              onClick={() => {
                new Audio("/heart.mp3").play()
                setLiked((prev) => !prev)
              }}
            >
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
          <p>❤️ {item.likes}</p>
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
