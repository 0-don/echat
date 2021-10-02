require('dotenv').config();
import axios from 'axios';
import axiosRetry from 'axios-retry';
axiosRetry(axios, { retries: 10 });
import probe from 'probe-image-size';
import fs from 'fs';
import { ApiClient } from 'twitch';
import { ClientCredentialsAuthProvider } from 'twitch-auth';

import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { log } from 'console';
import { TopGamesType, GameType, ImageSize, GameResultType } from './types';



axios.defaults.baseURL = 'https://api.igdb.com/v4';
axios.defaults.headers.common['Client-ID'] = process.env.TWITCH_CLIENT_ID!;

const authProvider = new ClientCredentialsAuthProvider(
  process.env.TWITCH_CLIENT_ID!,
  process.env.TWITCH_CLIENT_SECRET!
);
const apiClient = new ApiClient({ authProvider });

const getAccessToken = async () => {
  const url = `https://id.twitch.tv/oauth2/token?client_id=${process.env
    .TWITCH_CLIENT_ID!}&client_secret=${process.env
    .TWITCH_CLIENT_SECRET!}&grant_type=client_credentials`;

  const { data } = await axios.post(url);

  return data.access_token as string;
};

const getTopGames = async () => {
  const { data }: TopGamesType = await apiClient.helix.games.getTopGames({
    limit: '100',
  });

  return data.map(({ id, boxArtUrl, name }) => ({
    id: parseInt(id),
    boxArtUrl: boxArtUrl.replace('{width}', '171').replace('{height}', '228'),
    name,
  }));
};

const searchGame = async (name: string) => {
  const { data }: GameType = await axios.post(
    'games',
    `search "${name}"; fields name,first_release_date,summary,screenshots,artworks,cover,genres,multiplayer_modes,platforms, slug;`
  );

  return data.map((game) => {
    const typeGame = {
      ...game,
      covers: game.cover,
      first_release_date: dayjs.unix(game.first_release_date).isValid()
        ? dayjs.unix(game.first_release_date).format()
        : undefined,
    };
    delete typeGame.cover;
    return typeGame;
  });
};

const getImages = async (
  size: ImageSize,
  type: 'screenshots' | 'covers' | 'artworks',
  ids: GameResultType
) => {
  if (!ids) {
    return undefined;
  }

  let { data }: { data: { url: string }[] } = await axios.post(
    type,
    `fields url;
      where id = (${Number.isInteger(ids) ? ids : (ids as number[]).join(',')});
      limit 100;`
  );

  const imageUrls = data.map(({ url }) =>
    url.replace('//', 'https://').replace('t_thumb', `t_${size}`)
  );

  let images = [];
  for (let url of imageUrls) {
    try {
      let { width, height } = await probe(url, { retries: 10 });

      images.push({ type, url, width, height });
    } catch (err) {
      log(err);
    }
  }

  return images;
};

const getGenres = async (ids: GameResultType) => {
  if (!ids) {
    return undefined;
  }

  const { data }: { data: { id: number; name: string }[] } = await axios.post(
    'genres',
    `fields name;
     where id = (${Number.isInteger(ids) ? ids : (ids as number[]).join(',')});
     limit 100;`
  );

  return data.map(({ id, name }) => ({ id, name }));
};

const getMultiplayerModes = async (ids: GameResultType) => {
  if (!ids) {
    return undefined;
  }

  // campaigncoop,dropin,lancoop,offlinecoop,onlinecoop,splitscreen,splitscreenonline  => boolean object keys
  const { data }: { data: any[] } = await axios.post(
    'multiplayer_modes',
    `fields campaigncoop,dropin,lancoop,offlinecoop,onlinecoop,splitscreen,splitscreenonline;
     where id = (${Number.isInteger(ids) ? ids : (ids as number[]).join(',')});
     limit 100;`
  );

  const filteredKeys = data.map((mode) => {
    const keys = Object.keys(mode);

    const filteredKeys = keys.filter(
      (key) => typeof mode[key] == 'boolean' && mode[key]
    );

    return filteredKeys;
  });

  // flatten string[][] to string[] and remove duplicates
  const results = [...new Set([].concat.apply([], filteredKeys))] as string[];
  return results.length ? results : undefined;
};

const getPlatforms = async (ids: GameResultType) => {
  if (!ids) {
    return undefined;
  }

  const { data }: { data: { id: number; name: string }[] } = await axios.post(
    'platforms',
    `fields *;
     where id = (${Number.isInteger(ids) ? ids : (ids as number[]).join(',')});
     limit 100;`
  );

  return data.map(({ id, name }) => ({
    id,
    name: name.replace(' (Microsoft Windows)', ''),
  }));
};

const getFullGameData = async (name: string) => {
  const posibleGames = await searchGame(name);

  const game = posibleGames.find((game) => game.name === name);

  if (!game) {
    return undefined;
  }

  const screenshots = await getImages('720p', 'screenshots', game.screenshots);
  const artworks = await getImages('720p', 'artworks', game.artworks);
  const covers = await getImages('720p', 'covers', game.covers);

  const multiplayer_modes = await getMultiplayerModes(game.multiplayer_modes);
  const platforms = await getPlatforms(game.platforms);
  const genres = await getGenres(game.genres);

  return {
    igdbId: game.id,
    name: game.name,
    first_release_date: game.first_release_date,
    platforms,
    genres,
    multiplayer_modes,
    type: 'Games',
    slug: game.slug,
    images: [...(screenshots || []), ...(covers || []), ...(artworks || [])],
  };
};

export const getGames = async () => {
  // fs.unlinkSync('games.json');

  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${await getAccessToken()}`;

  const topGames = await getTopGames();

  let popularity = 0;
  const gamesList = [];
  for (let { boxArtUrl, id, name } of topGames) {
    try {
      popularity += 1;
      log(`Download ${popularity}/${topGames.length}: ${name}`);
      const game = await getFullGameData(name);

      if (!game || !game.platforms?.length) {
        continue;
      }

      gamesList.push({ twitchId: id, popularity, boxArtUrl, ...game });

      fs.writeFileSync('games.json', JSON.stringify(gamesList, null, '\t'));
    } catch (err) {
      log(err);
    }
  }
};
