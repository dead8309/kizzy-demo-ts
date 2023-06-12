import { AuthError, AuthResult } from "@/types/discord"
import axios from "axios"

export async function GET(req: Request) {
    return new Response(JSON.stringify({ hello: "world" }))
}

export async function POST(req: Request) {
    const body = await req.json()
    if (!body) return new Response("No Body", { status: 404 })
    try {
        const { data } = await axios.post<AuthResult>(
          "https://discord.com/api/v9/auth/login",
          JSON.stringify(body),
          {
            headers: {
              "Content-Type": "application/json"
            },
          }
        )
        return new Response(JSON.stringify(data), { status: 200 })
      } catch (error: any) {
        console.log(error)
        let data: AuthError = error.response.data
        return new Response(JSON.stringify(data), { status: 404 })
      }
}