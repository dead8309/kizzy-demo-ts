import { Client } from "../Client"
import { User } from "../constants/Payload"

export type Activity = {
  application_id?: string
  name: string
  state?: string
  details?: string
  startTimestamp?: number | Date | undefined
  endTimestamp?: number | Date | undefined
  largeImageKey?: string
  smallImageKey?: string
  largeImageText?: string
  smallImageText?: string
  button1?: {
    label: string | undefined
    url: string | undefined
  }
  button2?: {
    label: string | undefined
    url: string | undefined
  }
  type?: number | ActivityType.PLAYING
  status?: string | UserStatus.ONLINE
}

export enum UserStatus {
  ONLINE = "online",
  IDLE = "idle",
  DND = "dnd",
}

export enum ActivityType {
  PLAYING = 0,
  STREAMING = 1,
  LISTENING = 2,
  WATCHING = 3,
  CUSTOM = 4,
  COMPETING = 5,
}

export class ClientUser {
  /**
   * client
   */
  client: Client
  /**
   * user 
   */
  user: User

  constructor(client: Client,user: User) {
    this.client = client
    this.user = user
  }

  async setActivity(activity: Activity): Promise<void> {
    const formattedAcitivity: any = {
      ...activity,
      assets: {},
      timestamps: {},
    }
    if (activity.startTimestamp) {
      if (activity.startTimestamp instanceof Date) {
        formattedAcitivity.timestamps.start = Math.round(
          activity.startTimestamp.getTime()
        )
      } else if (typeof activity.startTimestamp === "number") {
        formattedAcitivity.timestamps.start = activity.startTimestamp
      }
    }
    if (activity.endTimestamp) {
      if (activity.endTimestamp instanceof Date) {
        formattedAcitivity.timestamps.end = Math.round(
          activity.endTimestamp.getTime()
        )
      } else if (typeof activity.endTimestamp === "number") {
        formattedAcitivity.timestamps.end = activity.endTimestamp
      }
    }
    const buttons: string[] = []
    const button_urls: string[] = []
    if (activity.button1) {
      if (activity.button1.label && activity.button1.url) {
        buttons.push(activity.button1.label)
        button_urls.push(activity.button1.url)
      }
    }
    if (activity.button2) {
      if (activity.button2.label && activity.button2.url) {
        buttons.push(activity.button2.label)
        button_urls.push(activity.button2.url)
      }
    }
    if (buttons.length > 0 && button_urls.length > 0) {
        formattedAcitivity.buttons = buttons
        formattedAcitivity.metadata = {
            button_urls: button_urls
        }
        formattedAcitivity.application_id = activity.application_id ?? "962990036020756480"
    }
    if (activity.largeImageKey)
      formattedAcitivity.assets.large_image = "mp:" + activity.largeImageKey
    if (activity.smallImageKey)
      formattedAcitivity.assets.small_image = "mp:" + activity.smallImageKey
    if (activity.largeImageText)
      formattedAcitivity.assets.large_text = activity.largeImageText
    if (activity.smallImageText)
      formattedAcitivity.assets.small_text = activity.smallImageText

    if (Object.keys(formattedAcitivity.assets).length === 0)
      delete formattedAcitivity["assets"]
    if (Object.keys(formattedAcitivity.timestamps).length === 0)
      delete formattedAcitivity["timestamps"]
    if (!activity.type) formattedAcitivity.type = ActivityType.PLAYING

    let status = activity.status ?? UserStatus.ONLINE
    // Clean-up
    delete formattedAcitivity["startTimestamp"]
    delete formattedAcitivity["endTimestamp"]
    delete formattedAcitivity["largeImageKey"]
    delete formattedAcitivity["smallImageKey"]
    delete formattedAcitivity["largeImageText"]
    delete formattedAcitivity["smallImageText"]
    delete formattedAcitivity["status"]
    delete formattedAcitivity["button1"]
    delete formattedAcitivity["button2"]
    return await this.client.request({
      op: 3,
      d: {
        activities: [formattedAcitivity],
        afk: true,
        since: Date.now(),
        status: status,
      },
    })
  }
}
