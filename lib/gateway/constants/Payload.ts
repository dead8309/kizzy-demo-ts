export const Hello = {
  op: 10,
  d: null,
};

export const Heartbeat = {
  op: 1,
  d: null,
};

export const Identify = (token: string | undefined) => {
  if (!token) {
    new Error('Token Not Specified')
  }
  return {
    op: 2,
    d: {
      token: token,
      properties: {
        $os: "disco",
        $browser: "chrome",
        $device: "chrome",
      },
      compress: false,
      capabilities: 65,
      largeThreshold: 100
    }
  };
};

export interface User {
  verified: boolean;
  username: string;
  purchased_flags: number;
  premium_type: number;
  premium: boolean;
  phone?: any;
  nsfw_allowed: boolean;
  mobile: boolean;
  mfa_enabled: boolean;
  id: string;
  flags: number;
  email: string;
  discriminator: string;
  desktop: boolean;
  bio: string;
  banner_color: string;
  banner?: any;
  avatar_decoration?: any;
  avatar?: any;
  accent_color: number;
}
