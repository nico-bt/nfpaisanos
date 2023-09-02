"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import arrowBack from "./arrow_back.svg"

export default function GetBack() {
  const router = useRouter()
  return (
    <Image
      style={{
        justifySelf: "flex-end",
        marginTop: 40,
        fill: "whitesmoke",
        background: "none",
        cursor: "pointer",
      }}
      onClick={() => router.back()}
      src={arrowBack}
      height={24}
      width={24}
      alt="back arrrow"
    />
  )
}
