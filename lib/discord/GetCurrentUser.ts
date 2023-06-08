"use client"

import axios from "axios"

import { AuthError, User } from "@/types/discord"

const GetCurrentUser = async (): Promise<User | null> => {
  if (typeof window !== undefined) {
    try {
      let token = localStorage.getItem("token")
      const { data } = await axios.get<User>(
        "https://discordapp.com/api/v9/users/@me",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      return data
    } catch (error: any) {
      return null
    }
  } else {
    return null
  }
}
export { GetCurrentUser }
