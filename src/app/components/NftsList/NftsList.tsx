"use client"
import { useState } from "react"
import FilterBar from "./FilterBar"

export default function NftsList({ nfts }: { nfts: NFPAISANO[] }) {
  const [filteredNfts, setFilteredNfts] = useState(nfts)

  return (
    <>
      <FilterBar setFilteredNfts={setFilteredNfts} nfts={nfts} />

      <section className="nfts-container">
        {filteredNfts.map((item) => (
          <article key={item.id} onClick={() => console.log(item.type)}>
            <img src={item.media.image} alt="imagen nft" />
            <h2>{item.author}</h2>
            <p>Stock: {item.stock}</p>
            <p>Price: {item.instantPrice}</p>
          </article>
        ))}
      </section>
    </>
  )
}
