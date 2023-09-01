import Link from "next/link"
import arrowBack from "./arrow_back.svg"
import Image from "next/image"
import styles from "./styles.module.css"

const getNftById = async (id: string): Promise<NFPAISANO> => {
  const res = await fetch(`${process.env.BASE_URL}/nfpaisanos/aunctions`, {
    headers: {
      apiKey: process.env.API_KEY as string,
    },
    next: { revalidate: 10 },
  })

  if (!res.ok) {
    throw new Error("Ups... Wrong response. Please try again")
  }

  const nfts = await res.json()
  const nft = nfts.find((item: NFPAISANO) => item.id === +id)
  return nft
}

export default async function page({ params }: { params: { id: string } }) {
  const nft = await getNftById(params.id)

  return (
    <div className={styles.grid}>
      <article>
        <img src={nft.media.image} alt="imagen nft" style={{ maxHeight: "90vh" }} />

        <div className={styles.body}>
          <img
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
          <p className={styles.biggerFont}>❤️ {nft.likes}</p>

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

          <Link href="/" style={{ justifySelf: "flex-end", marginTop: 40 }}>
            <Image
              style={{ fill: "whitesmoke", background: "none" }}
              src={arrowBack}
              height={24}
              width={24}
              alt="back arrrow"
            />
          </Link>
        </div>
      </article>
    </div>
  )
}
