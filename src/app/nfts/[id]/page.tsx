import styles from "./styles.module.css"
import GetBack from "./GetBack"
import Image from "next/image"
import { notFound } from "next/navigation"

//La API dejó de funcionar, temporary mock data
import allNfts from "@/app/mockData/allNfts.json"

const getNftById = (id: string): NFPAISANO => {
  // const res = await fetch(`${process.env.BASE_URL}/nfpaisanos/aunctions`, {
  //   headers: {
  //     apiKey: process.env.API_KEY as string,
  //   },
  //   next: { revalidate: 10 },
  // })

  // if (!res.ok) {
  //   throw new Error("Ups... Wrong response. Please try again")
  // }

  // const nfts = await res.json()

  const nfts = allNfts.map((item) => {
    return {
      ...item,
      createdAt: new Date(item.createdAt),
      endsAt: new Date(item.endsAt),
    }
  })

  const nft = nfts.find((item) => item.id === +id)
  if (!nft) {
    return notFound()
  }
  return nft as NFPAISANO
}

export default function page({ params }: { params: { id: string } }) {
  const nft = getNftById(params.id)

  return (
    <div className={styles.grid}>
      <article>
        <Image
          src={nft.media.image}
          alt="imagen nft"
          height={1333}
          width={1000}
          sizes="(max-width: 649px) 100vw, (max-width: 1150px) 67vw, 50vw"
          priority={true}
        />

        <div className={styles.body}>
          <Image
            height={60}
            width={60}
            src={nft.authorAvatar}
            alt="author avatar"
            className="avatar"
            style={{ height: 60, width: 60, marginInline: "auto" }}
          />
          <h2 style={{ textAlign: "center" }}>{nft.author}</h2>
          <p>
            Stock: <span className={styles.biggerFont}>{nft.stock}</span>
          </p>
          <p className={styles.price}>{nft.instantPrice}</p>

          <p>
            Highest bid
            <span className={styles.biggerFont}>{nft.highestBid}</span>
          </p>

          <p>
            Created at:
            <span className={styles.biggerFont}>{new Date(nft.createdAt).toDateString()}</span>
          </p>

          <p>
            Type:
            <span className={styles.biggerFont}>{nft.type}</span>
          </p>

          <p className={styles.type}>{nft.attributes.type}</p>

          <GetBack />
        </div>
      </article>
    </div>
  )
}
