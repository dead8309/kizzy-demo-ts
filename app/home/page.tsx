"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== "undefined") {
    let token = localStorage.getItem("token") || ""
    if (token.length > 0) router.push("/rpc")
    else router.push("/login")
  }
  })
}
