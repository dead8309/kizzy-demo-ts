"use client"

import axios from "axios"

import { AuthError, User } from "@/types/discord"

const GetCurrentUser = async (): Promise<User | null> => {
  if (typeof window !== undefined) {
    let token = localStorage.getItem("token")
    return token!=null ? await getUser(token) : null
  } else {
    return null
  }
}

const getUser = async (token: string): Promise<User | null> => {
  try {
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
}
export { GetCurrentUser, getUser }
