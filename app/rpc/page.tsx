import { RpcForm } from "@/components/rpc-form"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/config/site"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function Rpc() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Link
      href={siteConfig.links.app}
      className="flex w-fit rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      🎉 <Separator className="mx-2 h-4" orientation="vertical" /> Use Android app for extra features
      <ChevronRight className="ml-1 h-4 w-4" />
    </Link>
      <RpcForm />
    </section>
  )
}
