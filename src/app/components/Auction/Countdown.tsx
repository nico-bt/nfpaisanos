"use client"
import styles from "./styles.module.css"
import { useEffect, useState } from "react"

const useCountdown = (targetDate: Date) => {
  // OBS: La api devuelve fechas en el pasado, de cuando el challenge fue creado.
  // Pongo una fecha arbitraria futura para que la cuenta se regresiva
  // Si no cuenta respecto al pasado y va aumentando:
  //----------------------------------------------------------------------------
  //   const countDownDate = new Date(targetDate).getTime() //Esta línea iría con una fecha en el futuro
  const countDownDate = new Date("2023-11-06T06:42:33.000Z").getTime()

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return getReturnValues(countDown)
}

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

  return [days, hours, minutes, seconds]
}

export default function Countdown({ finalDate }: { finalDate: Date }) {
  const [days, hours, minutes, seconds] = useCountdown(finalDate)

  return (
    <div>
      <p className={styles.title}>Auction ending in</p>
      <div className={styles.clock}>
        <div>
          <p>{hours}</p>
          <span>Hrs</span>
        </div>
        <div>
          <p>{minutes}</p>
          <span>mins</span>
        </div>
        <div>
          <p suppressHydrationWarning>{seconds}</p>
          <span>secs</span>
        </div>
      </div>
    </div>
  )
}
