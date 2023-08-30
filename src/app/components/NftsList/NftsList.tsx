"use client"
import { useState } from "react"
import FilterBar from "./FilterBar"
import Link from "next/link"

export default function NftsList({ nfts }: { nfts: NFPAISANO[] }) {
  const [filteredNfts, setFilteredNfts] = useState(nfts)

  return (
    <>
      <FilterBar setFilteredNfts={setFilteredNfts} nfts={nfts} />

      <section className="nfts-container">
        {filteredNfts.length > 0 ? (
          filteredNfts.map((item) => (
            <article key={item.id} onClick={() => console.log(item.attributes)}>
              <Link href={`/nfts/${item.id}`}>
                <img src={item.media.image} alt="imagen nft" />
                <h2>{item.author}</h2>
                <p>Stock: {item.stock}</p>
                <p>Price: {item.instantPrice}</p>
                <p>Likes: {item.likes}</p>
              </Link>
            </article>
          ))
        ) : (
          <h1 style={{ gridColumn: "1/-1", textAlign: "center", marginTop: 100, height: 350 }}>
            No items match the selected filters
          </h1>
        )}
      </section>
    </>
  )
}
