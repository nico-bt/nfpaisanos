const getNftById = async (id: string): Promise<NFPAISANO> => {
  const res = await fetch(`${process.env.BASE_URL}/nfpaisanos/aunctions`, {
    headers: {
      apiKey: process.env.API_KEY as string,
    },
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
    <div style={{ display: "grid", justifyContent: "center" }}>
      <article
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", placeItems: "center", gap: 12 }}
      >
        <img src={nft.media.image} alt="imagen nft" style={{ maxHeight: "90vh" }} />

        <div>
          <h2>{nft.author}</h2>
          <p>Stock: {nft.stock}</p>
          <p>Price: {nft.instantPrice}</p>
          <p>Likes: {nft.likes}</p>
          <p>Author: {nft.author}</p>
          <p>Created at: {new Date(nft.createdAt).toDateString()}</p>
          <p>Type: {nft.type}</p>
        </div>
      </article>
    </div>
  )
}
