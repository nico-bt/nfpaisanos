import Auction from "./components/Auction/Auction"
import NftsList from "./components/NftsList/NftsList"

// Get Nfts function
// ----------------------------------------------------------------------------
const getNfts = async (category: string): Promise<NFPAISANO[]> => {
  const res = await fetch(`${process.env.BASE_URL}/nfpaisanos/${category}`, {
    headers: {
      apiKey: process.env.API_KEY as string,
    },
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
    // mode: "no-cors",
    headers: {
      apiKey: process.env.API_KEY as string,
    },
  })
  return res.json()
}

// Home Page
// ----------------------------------------------------------------------------
export default async function Home() {
  const popularNfts = await getNfts("popular")
  const allNfts = await getNfts("aunctions")
  const prices = await getEthPrice()

  return (
    <>
      <Auction nfts={popularNfts} ethPrice={Number(prices.usd.replace(",", ""))} />

      <NftsList nfts={allNfts} />
    </>
  )
}
