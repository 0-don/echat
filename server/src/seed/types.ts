import { List } from '../entity/Service';

export type perType = 'Game' | '15 Min' | '30 Min' | '45 Min' | '60 Min';
export type statusType = 'cancelled' | 'pending' | 'started' | 'completed';

export type ReviewType = {
  score: number;
  recommend: boolean;
  review: string;
  targetId: number;
  sourceId: number;
  orderId: number;
  userServiceId: number;
}[];

export type OrderType = {
  status: statusType;
  price: number;
  rounds: number;
  per: perType;
  startTime: Date;
  startedTime: Date | undefined;
  finalPrice: number;
  buyerId: number;
  sellerId: number;
  userServiceId: number;
}[];

export type UserType = {
  type: string;
  fake: boolean;
  username: string;
  email: string;
  password: string;
  lastOnline: Date;
  description: string | undefined;
  age: Date | undefined;
  gender: string | undefined;
  discord: string | undefined;
  twitter: string | undefined;
  facebook: string | undefined;
  snapchat: string | undefined;
  instagram: string | undefined;
  twitch: string | undefined;
  steam: string | undefined;
  tiktok: string | undefined;
  countryId: number;
};

export type ImageType = {
  type: string;
  url: string;
  publicId: string;
  userId: number;
};

export type UserServiceType = {
  status: boolean;
  level: string | undefined;
  platforms: List[] | undefined;
  description: string | undefined;
  price: number;
  userId: number;
  serviceId: number;
  per: string;
  image: string | undefined;
  createdAt: Date;
};

export type UserLanguageType = {
  name: string;
  languageId: number;
  userId: number;
};

export type SchedulesType = {
  name: string;
  from: Date;
  to: Date;
  available: boolean;
  userId: number;
};

export interface Image {
  serviceId: number;
  type: string;
  url: string;
  width: number;
  height: number;
}

export interface Services {
  type: string;
  twitchId: number;
  boxArtUrl: string;
  igdbId: number;
  name: string;
  popularity: number;
  first_release_date?: string;
  platforms: { id: number; name: string }[];
  genres: { id: number; name: string }[];
  multiplayer_modes: string[];
  images: Image[] | undefined;
  slug: string;
}

export type GameResultType = number[] | number | undefined;
export type TopGamesType = {
  data: { id: string; boxArtUrl: string; name: string }[];
};

export type GameType = {
  data: {
    id: number;
    name: string;
    first_release_date: number;
    summary: string;
    screenshots: GameResultType;
    artworks: GameResultType;
    cover: GameResultType;
    genres: GameResultType;
    multiplayer_modes: GameResultType;
    platforms: GameResultType;
    slug: string;
  }[];
};
export type ImageSize =
  | '1080p'
  | '720p'
  | 'screenshot_huge'
  | 'screenshot_big'
  | 'screenshot_med'
  | 'cover_big'
  | 'logo_med'
  | 'cover_small'
  | 'thumb'
  | 'micro';
