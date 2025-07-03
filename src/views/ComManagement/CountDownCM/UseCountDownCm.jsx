import { useEffect, useState } from 'react'

const UseCountDownCm = (difference, duetimeCalc) => {
  const CalculateTimeLeft = () => {
    let timeleft = {}
    if (difference > 0) {
      timeleft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    } else {
      timeleft = {
        days: Math.floor(duetimeCalc / (1000 * 60 * 60 * 24)),
        hours: Math.floor((duetimeCalc / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((duetimeCalc / 1000 / 60) % 60),
        seconds: Math.floor((duetimeCalc / 1000) % 60),
      }
    }
    return timeleft
  }
  const [timeleft, setTimeLeft] = useState(CalculateTimeLeft())
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(CalculateTimeLeft())
    }, 1000)
    return () => clearTimeout(timer)
  })
  return timeleft
}

export default UseCountDownCm
