"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { RpcFormSchema } from "@/lib/zod-schemas/form-schema"
import { formatDate } from "@/lib/utils"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SwitchBar } from "@/components/switch-bar"

import { use, useEffect, useState } from "react"
import { Client, ClientUser } from "@/lib/gateway"

export function RpcForm() {
  const [enabled, setEnabled] = useState(false)
  const [clientUser, setClientUser] = useState<ClientUser | null>(null)
  const form = useForm<z.infer<typeof RpcFormSchema>>({
    resolver: zodResolver(RpcFormSchema),
    defaultValues: {
      name: "",
      type: 0,
      status: 'online'
    },
  })
  const client = new Client()
  client.on('ready', (user) => {
    setClientUser(user)
    console.log('Connected To Gateway')
    setEnabled(true)
  })
  client.on('disconnected', () => {
    setClientUser(null)
    console.warn('Disconnected From Gateway')
    setEnabled(false)
  })

  async function startRpc(check: boolean) {
    if (check) {
      const token = localStorage.getItem('token')
      token ? client.login(token) : undefined
    } else {
      await client.destroy()
    }
  }
  async function onSubmit(values: z.infer<typeof RpcFormSchema>) {
    console.log(values)
    console.log(clientUser)
    await clientUser?.setActivity({
      name: values.name,
      details: values.details,
      state: values.state,
      status: values.status,
      largeImageKey: values.assets?.large_image,
      smallImageKey: values.assets?.small_image,
      button1: {
        label: values.button1_text,
        url: values.button1_url
      },
      button2: {
        label: values.button2_text,
        url: values.button2_url
      },
      type: values.type
    })
  }
  return (
    <div>
      <SwitchBar onClick={startRpc} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Activity Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input placeholder="Activity Details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="Activity State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{/* 
        <FormField
          control={form.control}
          name="timestamps.start"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Timestamps</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  type="datetime-local"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().slice(0, -1)
                      : ""
                  }
                  onChange={(event) => {
                    console.log(formatDate(event.target.value))
                    field.onChange(formatDate(event.target.value))
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timestamps.end"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stop Timestamps</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  type="datetime-local"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().slice(0, -1)
                      : ""
                  }
                  onChange={(event) => {
                    console.log(formatDate(event.target.value))
                    field.onChange(formatDate(event.target.value))
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="dnd">Dnd</SelectItem>
                    <SelectItem value="idle">Idle</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
          control={form.control}
          name="button1_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Button 1 Text</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="button1_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Button 1 Url</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="button2_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Button 2 Text</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="button2_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Button 2 Url</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="assets.large_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Large Image</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assets.small_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Small Image</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Playing</SelectItem>
                    <SelectItem value="1">Streaming</SelectItem>
                    <SelectItem value="2">Listening</SelectItem>
                    <SelectItem value="3">Watching</SelectItem>
                    <SelectItem value="5">Competing</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={ !enabled } type="submit" >Update Presence</Button>
        </form>
      </Form>
    </div>
  )
}
