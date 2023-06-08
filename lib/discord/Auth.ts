"use client"

import { AuthPayload, AuthResult, AuthError, AuthResponse } from "@/types/discord"
import axios from "axios"

const DiscordAuth = async (
  auth: AuthPayload
): Promise<AuthResponse> => {
  try {
    const { data } = await axios.post<AuthResult>(
      "/api/login",
      JSON.stringify(auth)
    )
    return { success: true, ...data }
  } catch (error: any) {
    console.log(error)
    let data: AuthError = error.response.data
    return { success: false, ...data}
  }
}
export { DiscordAuth }
