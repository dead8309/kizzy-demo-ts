"use client"

import { AuthPayload, AuthResult, RequestError } from "@/types/discord"
import axios from "axios"


const DiscordAuth = async (
  auth: AuthPayload
): Promise<AuthResult | RequestError> => {
  try {
    const response = await axios.post<AuthResult>(
      "https://discord.com/api/v9/auth/login",
      JSON.stringify(auth),
      {
        headers: {
          "Content-Type": "application/json"
        },
      }
    )
    console.log(response)
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.response.data as RequestError
  }
}
export { DiscordAuth }
