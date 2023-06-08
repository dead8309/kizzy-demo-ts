import { LoginForm } from "@/components/login-form";

export default function Login() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <LoginForm />
      </div>
    </section>
  )
}