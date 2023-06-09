import * as z from "zod"

const INVALID_IMAGE_URL = "Invalid Url. Use discord image attachments urls only"
const DISCORD_CDN = "https://cdn.discordapp.com"
const DISCORD_MEDIA = "https://media.discordapp.net"
const pattern =
  /(https?:\/\/(?:cdn\.discordapp\.net|media\.discordapp\.net\/))/g

// interface for Timestamps
const TimestampsSchema = z.object({
  start: z.coerce.string().datetime({ precision: 0, offset: true }).optional(),
  end: z.coerce.string().datetime({ precision: 0, offset: true }).optional(),
})

// interface for Assets
const AssetsSchema = z.object({
  large_image: z
    .string()
    .refine(
      (value) =>
        value.startsWith(DISCORD_CDN) ||
        value.startsWith(DISCORD_MEDIA) ||
        value.startsWith("attachments/"),
      INVALID_IMAGE_URL
    )
    .optional()
    .transform((arg) => arg?.replace(pattern, "")),
  small_image: z
    .string()
    .refine(
      (value) =>
        value.startsWith(DISCORD_CDN) ||
        value.startsWith(DISCORD_MEDIA) ||
        value.startsWith("attachments/"),
      INVALID_IMAGE_URL
    )
    .optional()
    .transform((arg) => arg?.replace(pattern, "")),
  /* large_text: z.string().optional(),
    small_text: z.string().optional(), */
})

const RpcFormSchema = z.object({
  name: z.string().nonempty("Activity Name is required"),
  type: z.coerce.number().int().min(0).max(5),

  details: z.string().optional(),
  status: z.enum(["online", "idle", "dnd"], {
    errorMap: (i, e) => ({
      message: `${e.data} is invalid. Use online, idle or dnd`,
    }),
  }),

  timestamps: TimestampsSchema.optional(),

  state: z.string().optional(),

  button1_text: z.string().max(32).optional(),
  button1_url: z.string().url().optional(),
  button2_text: z.string().max(32).optional(),
  button2_url: z.string().url().optional(),
  assets: AssetsSchema.optional(),
})

export { RpcFormSchema }
