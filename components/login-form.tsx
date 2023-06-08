"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { AuthPayload } from "@/types/discord"
import { DiscordAuth } from "@/lib/discord/Auth"
import { GetCurrentUser } from "@/lib/discord/GetCurrentUser"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function gotoRpc() {
    router.push("/rpc")
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let hCaptchaToken = token
    if (!hCaptchaToken) {
      const response = await captchaRef.current?.execute({ async: true })
      hCaptchaToken = response?.response ?? null
    }
    let payload: AuthPayload = {
      captcha_key: hCaptchaToken,
      login: values.email,
      password: values.password,
      undelete: false,
    }
    let result = await DiscordAuth(payload)
    console.log(result)
    if (result.success) {
      console.log("Success")
      localStorage.setItem("token", result.token ?? "")
      let user = await GetCurrentUser()
      toast({
        title: "Login Successful",
        description: `Welcome ${user?.username}#${user?.discriminator}`,
        action: (
          <ToastAction altText="Go to Rpc" onClick={gotoRpc}>Go To Rpc</ToastAction>
        ),
      })
    } else {
      console.log("Error")
      setError(result.errors?.login._errors[0].message ?? null)
    }
    captchaRef.current?.resetCaptcha()
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
                <Input placeholder="" {...field} type="password" />
              </FormControl>
              <FormMessage>{error ?? ""}</FormMessage>
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
