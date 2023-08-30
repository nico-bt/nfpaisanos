"use client"
import styles from "./styles.module.css"
import { Dispatch, SetStateAction, useState, ChangeEvent, useEffect } from "react"

interface props {
  setFilteredNfts: Dispatch<SetStateAction<NFPAISANO[]>>
  nfts: NFPAISANO[]
}

export default function FilterBar({ setFilteredNfts, nfts }: props) {
  const [filter, setFilter] = useState({ category: "all", byDate: "newest" })

  const sortAndFilter = () => {
    // Sort by date
    //--------------------
    if (filter.byDate === "newest") {
      setFilteredNfts(
        [...nfts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      )
    }

    if (filter.byDate === "oldest") {
      setFilteredNfts(
        [...nfts].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      )
    }

    // Filter by category
    //---------------------
    if (filter.category === "all") {
      return
    }
    if (filter.category === "art") {
      setFilteredNfts((prev) => prev.filter((item) => item.type === "Art"))
    }
    if (filter.category === "photography") {
      setFilteredNfts((prev) => prev.filter((item) => item.type === "Photography"))
    }
  }

  // Handle events
  // --------------------------------------------------
  const handleClickOrderByAge = (e: any) => {
    console.log(e.target.value)
    setFilter((prev) => {
      return { ...prev, byDate: e.target.value }
    })
  }

  const handleClickCategory = (e: any) => {
    setFilter((prev) => {
      return { ...prev, category: e.target.value }
    })
  }

  //Cada vez que cambia filter => sortAndFilter. Los filter son acumulativos
  useEffect(() => {
    sortAndFilter()
  }, [filter])

  return (
    <div className={styles.filterbar}>
      <select name="orderByAge" id="orderByAge" onChange={handleClickOrderByAge}>
        <option value="newest" selected>
          Newest
        </option>
        <option value="oldest">Oldest</option>
      </select>

      <div className={styles.btns_container}>
        <button
          className={filter.category === "all" ? styles.active : ""}
          onClick={handleClickCategory}
          value="all"
        >
          All items
        </button>
        <button
          className={filter.category === "art" ? styles.active : ""}
          onClick={handleClickCategory}
          value="art"
        >
          Art
        </button>
        <button
          className={filter.category === "photography" ? styles.active : ""}
          onClick={handleClickCategory}
          value="photography"
        >
          Photography
        </button>
      </div>
    </div>
  )
}
