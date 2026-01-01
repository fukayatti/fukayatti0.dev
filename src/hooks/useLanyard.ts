import useSWR from 'swr';

const DISCORD_ID = '1191166553190846555';

export interface LanyardData {
  kv: Record<string, string>;
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    bot: boolean;
    global_name: string;
    display_name: string;
    public_flags: number;
    avatar_decoration_data: null | { asset: string; sku_id: string };
  };
  activities: {
    id: string;
    name: string;
    type: number;
    state?: string;
    details?: string;
    url?: string;
    timestamps?: { start: number; end?: number };
    application_id?: string;
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
    emoji?: {
      name: string;
      id?: string;
      animated?: boolean;
    };
    created_at: number;
    flags?: number;
    session_id?: string;
    buttons?: string[];
    sync_id?: string;
  }[];
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  spotify: null | {
    track_id: string;
    timestamps: { start: number; end: number };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  };
}

interface LanyardResponse {
  data: LanyardData;
  success: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useLanyard() {
  const { data, error } = useSWR<LanyardResponse>(
    `https://api.lanyard.rest/v1/users/${DISCORD_ID}`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}
