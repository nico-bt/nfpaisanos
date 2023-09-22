import Auction from "./components/Auction/Auction"
import NftsList from "./components/NftsList/NftsList"
import PaisanosHero from "./components/PaisanosHero/PaisanosHero"

//temporary mock Data from failing API
import popularNftsJson from "@/app/mockData/popular.json"
import allNftsJson from "@/app/mockData/allNfts.json"

// Get Nfts function
// ----------------------------------------------------------------------------
const getNfts = async (category: string): Promise<NFPAISANO[]> => {
  const res = await fetch(`${process.env.BASE_URL}/nfpaisanos/${category}`, {
    headers: {
      apiKey: process.env.API_KEY as string,
    },
    next: { revalidate: 10 },
  })

  if (!res.ok) {
    throw new Error("Ups... Wrong response. Please try again")
  }

  return res.json()
}

// Get Eth dollar price function
// ----------------------------------------------------------------------------
const getEthPrice = async (): Promise<{ eth: string; usd: string }> => {
  const res = await fetch(`${process.env.BASE_URL}/nfpaisanos/eth-price`, {
    method: "GET",
    headers: {
      apiKey: process.env.API_KEY as string,
    },
    next: { revalidate: 10 },
  })
  return res.json()
}

// Home Page
// ----------------------------------------------------------------------------
export default async function Home() {
  // La API de Paisanos parece dejó de funcionar en estos días.
  // Le meto datos estáticos para que siga funcionando la publi en linkedin sin mostrar error unos días más...

  // const popularNfts = await getNfts("popular")
  // const allNfts = await getNfts("aunctions")
  // const prices = await getEthPrice()

  const popularNfts = popularNftsJson.map((item) => {
    return { ...item, createdAt: new Date(item.createdAt), endsAt: new Date(item.endsAt) }
  })

  const allNfts = allNftsJson.map((item) => {
    return { ...item, createdAt: new Date(item.createdAt), endsAt: new Date(item.endsAt) }
  })

  return (
    <>
      <Auction nfts={popularNfts as NFPAISANO[]} ethPrice={1133.52} />

      <NftsList nfts={allNfts as NFPAISANO[]} />
      <PaisanosHero />
    </>
  )
}
