export enum Constants {
  GATEWAY  = "wss://gateway.discord.gg/?v=9&encoding=json",
}
export enum OpCodes {
  Dispatch  = 0,
  Heartbeat  = 1,
  Identify = 2,
  PresenceUpdate = 3,
  VoiceStateUpdate = 4,
  Resume = 6,
  Reconnect = 7,
  RequestGuildMembers = 8,
  InvalidSession = 9,
  Hello = 10,
  HeartbeatAck = 11,
}
