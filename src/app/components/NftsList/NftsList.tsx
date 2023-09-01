"use client"
import { useEffect, useState } from "react"
import FilterBar from "./FilterBar"
import styles from "./styles.module.css"
import { Card } from "./Card"

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
          filteredNfts.map((item) => (
            <Card key={item.id} item={item} setFilteredNfts={setFilteredNfts} />
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
