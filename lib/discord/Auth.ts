"use client"

import { AuthPayload, AuthResult, AuthError } from "@/types/discord"
import axios from "axios"

type AuthResponse = { success: true } & AuthResult | { success: false } & AuthError
const DiscordAuth = async (
  auth: AuthPayload
): Promise<AuthResponse> => {
  try {
    const { data } = await axios.post<AuthResult>(
      "https://discord.com/api/v9/auth/login",
      JSON.stringify(auth),
      {
        headers: {
          "Content-Type": "application/json"
        },
      }
    )
    return { success: true, ...data }
  } catch (error: any) {
    console.log(error)
    let data: AuthError = error.response.data
    return { success: false, ...data}
  }
}
export { DiscordAuth }
