export interface AuthPayload {
  captcha_key: string | null
  login: string | null
  password: string | null
  undelete: boolean | false
}

export interface AuthResult {
  token: string
  user_id: string
  type: 'auth'
}

export interface RequestError {
  type: 'error'
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