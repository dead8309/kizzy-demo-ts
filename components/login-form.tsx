"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DiscordAuth } from "@/lib/discord/Auth"
import { AuthPayload } from "@/types/discord"

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export function LoginForm() {
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "jsjjsjsjeh773837jsjsje@gmail.com",
      password: "monu8309",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let hCaptchaToken = token
    if (!hCaptchaToken) {
      const response = await captchaRef.current?.execute({ async: true })
      hCaptchaToken = response?.response ?? null
    }
    let payload: AuthPayload = {
        captcha_key: hCaptchaToken,
        login: values.email,
        password: values.password,
        undelete: false
    }
    var result = await DiscordAuth(payload)
    if (result.type == 'auth') {
        // Do Something 
    } else {
        // Error
        setError(result.errors.login._errors[0].message ?? null)
    }
    console.log(result)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="xyz@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="password"/>
              </FormControl>
              <FormMessage>
                {error ?? ""}
              </FormMessage>
            </FormItem>
          )}
        />
        <HCaptcha
          ref={captchaRef}
          sitekey="f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34"
          onVerify={setToken}
          onExpire={() => setToken(null)}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  )
}