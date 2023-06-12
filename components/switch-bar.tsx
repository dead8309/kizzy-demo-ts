"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

type SwitchBarProps = {
  onClick: (check: boolean) => void
}

export function SwitchBar({ onClick }: SwitchBarProps) {
  const [checked, setChecked] = useState(false)
  return (
    <div className="flex justify-center">
      <div className="flex w-full cursor-pointer select-none items-center justify-between rounded-3xl bg-secondary px-4 py-5 text-secondary-foreground hover:ring-2"
        onClick={() => {
          setChecked(!checked)
          onClick(!checked)
        }}>
        <Label className="text-2xl">
          <span>Enable Rpc</span>
        </Label>
        <Switch
          checked={checked}
        />
      </div>
    </div>
  )
}
