export interface AuthPayload {
  captcha_key: string | null
  login: string | null
  password: string | null
  undelete: boolean | false
}

export interface AuthResult {
  token: string | null
  user_id: string | null
  user_settings: {
    locale: string
    theme: string
  }
}

export interface AuthError {
  code: number
  message: string
  errors: {
    login: {
      _errors: DiscordError[]
    }
  }
}
export interface DiscordError {
  message: string
  code: number
}

export interface User {
  id: string
  username: string
  discriminator: string
  avatar: string
  banner: string
}
export type AuthResponse = { success: true } & AuthResult | { success: false } & AuthError