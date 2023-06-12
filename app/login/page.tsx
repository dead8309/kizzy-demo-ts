"use client"

import { LoginForm } from "@/app/login/login-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [token,setToken] = useState("")
  const router = useRouter()
  function handleSave() {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token)
      router.push("/rpc")
    }
  }
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <LoginForm />
        <div className="w-full py-9 space-y-3">
          <div className="flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground">
              Or continue with
            </span>
          </div>
          <Input id="email" type="email" placeholder="Discord Token" value={token} onChange={(v)=>setToken(v.currentTarget.value)}/>
          { token.length != 0 ? <Button onClick={handleSave}>Save</Button> : null }
        </div>
      </div>
    </section>
  )
}