import styles from "./page.module.css"

const getPopularNfts = async (): Promise<NFPAISANO[]> => {
  const res = await fetch(`${process.env.BASE_URL}/nfpaisanos/aunctions`, {
    headers: {
      apiKey: process.env.API_KEY as string,
    },
  })

  if (!res.ok) {
    throw new Error("Ups... Wrong response. Please try again")
  }

  return res.json()
}

export default async function Home() {
  const popularNfts = await getPopularNfts()

  return (
    <main className={styles.main}>
      <section className="nfts-container">
        {popularNfts.map((item) => (
          <article key={item.id}>
            <img src={item.media.image} alt="imagen nft" />
            <h2>{item.author}</h2>
            <p>Stock: {item.stock}</p>
            <p>Price: {item.instantPrice}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
