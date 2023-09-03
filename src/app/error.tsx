"use client" // Error components must be Client Components

import Link from "next/link"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="error_page">
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="btn"
      >
        Try again
      </button>

      <Link href="/" className="btn secondary">
        Back Home
      </Link>
    </div>
  )
}
