import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Github } from "lucide-react"
import { Icons } from "@/components/icons"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Kizzy Rpc
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Open Source Demo app built with NextJS, Radix Ui, Tailwindcss and
          shadcn components.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/home"
          className={buttonVariants()}
        >Get Started</Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          <Icons.gitHub className="mr-2 h-4 w-4" />
          GitHub
        </Link>
      </div>
    </section>
  )
}
