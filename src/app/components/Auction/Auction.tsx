"use client"

import Image from "next/image"
import styles from "./styles.module.css"
import letfArrow from "./icons/arrow_left.svg"
import rightArrow from "./icons/arrow_right.svg"
import eth from "./icons/eth.svg"
import { useState } from "react"
import Countdown from "./Countdown"

export default function Auction({ nfts, ethPrice }: { nfts: NFPAISANO[]; ethPrice: number }) {
  const [nftsArray, setNftsArray] = useState(nfts)
  const [index, setIndex] = useState(0)

  const handleClickLeft = () => {
    if (index === 0) return
    setIndex(index - 1)
  }

  const handleClickRight = () => {
    if (index < nftsArray.length - 1) {
      setIndex(index + 1)
    }
  }

  return (
    <section className={styles.auction_container}>
      <img src={nftsArray[index].media.image} alt="nft image" />

      <div className={styles.description}>
        <div>
          <h2>
            {nftsArray[index].author}
            <span className={styles.registered}>®</span>
          </h2>
          <div className={styles.creator_price}>
            <div>
              <img className="avatar" alt="creator avatar" src={nftsArray[index].authorAvatar} />
              <div>
                <h3>Creator</h3>
                <p>{nftsArray[index].author}</p>
              </div>
            </div>

            <div>
              <Image
                className="avatar"
                alt="instan price"
                src={eth}
                height={24}
                width={24}
                style={{ backgroundColor: "var(--Primary-4)", padding: 5 }}
              />
              <div>
                <h3>Instant Price</h3>
                <p>{nftsArray[index].instantPrice}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.currentBid}>
          <div>
            <p className={styles.title}>Current Bid</p>
            <p className={styles.eth}>{nftsArray[index].highestBid}</p>

            {/* ETH to USD */}
            <p className={styles.dollars}>
              ${(+nftsArray[index].highestBid.split(" ")[0] * ethPrice).toLocaleString("en-IN")}
            </p>
          </div>

          <Countdown finalDate={nftsArray[index].endsAt} />
        </div>

        <div className={styles.btns_container}>
          <button className="btn">Place a bid</button>
          <button className="btn secondary">View item</button>
        </div>

        <div className={styles.arrows_container}>
          <Image
            width={40}
            height={40}
            src={letfArrow}
            alt="left arrow"
            style={index === 0 ? { opacity: "0.3" } : { opacity: "1", cursor: "pointer" }}
            onClick={handleClickLeft}
          />
          <Image
            width={40}
            height={40}
            src={rightArrow}
            alt="right arrow"
            style={
              index < nftsArray.length - 1
                ? { opacity: "1", cursor: "pointer" }
                : { opacity: "0.3" }
            }
            onClick={handleClickRight}
          />
        </div>
      </div>
    </section>
  )
}
