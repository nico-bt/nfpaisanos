"use client"
import { createContext, useState, Dispatch, SetStateAction } from "react"

interface filterType {
  category: string
  sortBy: string
  maxPrice: number
  color: string
}

interface UserContextType {
  userLikes: number[]
  setUserLikes: Dispatch<SetStateAction<number[]>>
  filter: filterType
  setFilter: Dispatch<SetStateAction<filterType>>
}

export const UserContext = createContext<UserContextType>({
  userLikes: [],
  setUserLikes: () => {},
  filter: { category: "", sortBy: "", maxPrice: Infinity, color: "" },
  setFilter: () => {},
})

export const UserContextProvider = ({ children }: { children: any }) => {
  // Para poder agregar likes
  // En una app real debiera mandarse un POST a la API. Pero acá queda lindo para dar cierta interactividad.
  // Trackeo a qué nft.id le dió like el user para mostrar ❤️/🤍 y sumar un voto al item en cuestión en el NFPAISANOS[] gral
  const [userLikes, setUserLikes] = useState<number[]>([])

  // Para mantener el filtro cuando vas/volvés de la details page /ntfs/[id]
  const [filter, setFilter] = useState<filterType>({
    category: "All",
    sortBy: "newest",
    maxPrice: Infinity,
    color: "All",
  })

  return (
    <UserContext.Provider value={{ userLikes, setUserLikes, filter, setFilter }}>
      {children}
    </UserContext.Provider>
  )
}
