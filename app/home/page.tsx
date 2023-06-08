"use client"
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter()
    let token = localStorage.getItem('token') || ''
    if (token.length > 0) router.push('/rpc')
    else router.push('/login')
}