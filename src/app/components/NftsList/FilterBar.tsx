"use client"
import styles from "./styles.module.css"
import { Dispatch, SetStateAction, useState, ChangeEvent, useEffect } from "react"

interface props {
  setFilteredNfts: Dispatch<SetStateAction<NFPAISANO[]>>
  nfts: NFPAISANO[]
}

export default function FilterBar({ setFilteredNfts, nfts }: props) {
  const nftMaxPrice = Math.max(...nfts.map((item) => Number(item.instantPrice.split(" ")[0])))
  const nftMinPrice = Math.min(...nfts.map((item) => Number(item.instantPrice.split(" ")[0])))

  const colors = ["All", ...Array.from(new Set(nfts.map((item) => item.attributes.color)))]
  const categories = ["All", ...Array.from(new Set(nfts.map((item) => item.type)))]

  const [filter, setFilter] = useState({
    category: "All",
    sortBy: "newest",
    maxPrice: nftMaxPrice,
    color: "All",
  })

  const sortAndFilter = () => {
    // Sort by date or by price or by liked
    //---------------------------------------
    if (filter.sortBy === "newest") {
      setFilteredNfts(
        [...nfts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      )
    }

    if (filter.sortBy === "oldest") {
      setFilteredNfts(
        [...nfts].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      )
    }
    if (filter.sortBy === "cheapest") {
      setFilteredNfts(
        [...nfts].sort((a, b) => +a.instantPrice.split(" ")[0] - +b.instantPrice.split(" ")[0])
      )
    }
    if (filter.sortBy === "expensive") {
      setFilteredNfts(
        [...nfts].sort((a, b) => +b.instantPrice.split(" ")[0] - +a.instantPrice.split(" ")[0])
      )
    }
    if (filter.sortBy === "mostLiked") {
      setFilteredNfts([...nfts].sort((a, b) => +b.likes - +a.likes))
    }
    if (filter.sortBy === "leastLiked") {
      setFilteredNfts([...nfts].sort((a, b) => +a.likes - +b.likes))
    }

    // Filter by maximum price
    //----------------------------
    setFilteredNfts((prev) =>
      prev.filter((item) => +item.instantPrice.split(" ")[0] <= +filter.maxPrice)
    )

    // Filter by color
    //----------------------------
    if (filter.color !== "All") {
      setFilteredNfts((prev) => prev.filter((item) => item.attributes.color === filter.color))
    }

    // Filter by category
    //------------------------
    if (filter.category === "All") {
      return
    }
    setFilteredNfts((prev) => prev.filter((item) => item.type === filter.category))
  }

  // Handle events
  // --------------------------------------------------
  const handleChange = (e: any) => {
    setFilter((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  //Cada vez que cambia filter => sortAndFilter. Los filter son acumulativos
  useEffect(() => {
    sortAndFilter()
  }, [filter])

  return (
    <>
      <div className={styles.filterbar}>
        {/* SORT BY */}
        <select name="sortBy" id="sortBy" onChange={handleChange}>
          <option disabled>BY DATE</option>
          <option value="newest" selected>
            &emsp; Newest
          </option>
          <option value="oldest">&emsp; Oldest</option>
          <option disabled>BY PRICE</option>
          <option value="cheapest">&emsp; Cheapest</option>
          <option value="expensive">&emsp; Expensive</option>
          <option disabled>BY LIKES</option>
          <option value="mostLiked">&emsp; Most liked</option>
          <option value="leastLiked">&emsp; Least liked</option>
        </select>

        {/* FILTER MAX PRICE */}
        <div style={{ width: 220 }}>
          <label htmlFor="maxPrice">
            Max Price: <span style={{ fontSize: "1.3rem", marginLeft: 6 }}>{filter.maxPrice}</span>{" "}
            ETH
          </label>
          <input
            id="maxPrice"
            type="range"
            step={0.5}
            max={nftMaxPrice + 0.5}
            min={nftMinPrice}
            value={filter.maxPrice}
            onChange={handleChange}
            name="maxPrice"
            style={{ width: "100%" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
            <span>{nftMinPrice} ETH</span>
            <span>{nftMaxPrice} ETH</span>
          </div>
        </div>

        {/* FILTER BY COLOR */}
        <select name="color" id="filterByColor" onChange={handleChange}>
          <option disabled selected>
            COLOR
          </option>
          {colors.map((color) => (
            <option key={color} value={color}>
              &emsp;{color}
            </option>
          ))}
        </select>

        {/* FILTER CATEGORY */}
        <div className={styles.btns_container}>
          {categories.map((category) => (
            <button
              key={category}
              className={filter.category === category ? styles.active : ""}
              onClick={handleChange}
              value={category}
              name="category"
            >
              {category === "All" ? "All items" : category}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
