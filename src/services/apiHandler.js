import axios from 'axios';

const token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwZXhvazQ3MjEwQGludHN2Lm5ldCIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE1OTczOTYwNDF9.QX-MwGZq07Ez_xXVsaFt1BFkVbOtlqU_M75PeaFvbEZrfKB3uMcEtS4IkEQyHtQKoU814zUAkqlfb-qtLcW9Ag';

const instance = axios.create({
  baseURL: 'https://tikact.sanesquare.com/api',
  headers: { Authorization: token },
});

export const fetchTrendingVideos = () => getData('/trendingVideos');

export const fetchTrendingActors = () => getData('/trendingActors');

export const fetchTrendingHashtags = () => getData('/getTrendingHashTags');

export const fetchTrendingTracks = () => getData('/getTrendingTracks');

export const fetchVideos = (
  search = '',
  pagination = { limit: 10, offset: 0 }
) => {
  const queryString = `searchString=${search}&limit=${pagination.limit}&offset=${pagination.offset}`;

  return getData(`/getVideos?${queryString}`);
};

export const fetchHashTags = (
  search = '',
  pagination = { limit: 10, offset: 0 }
) => {
  const queryString = `searchString=${search}&limit=${pagination.limit}&offset=${pagination.offset}`;

  return getData(`/getHashTags?${queryString}`);
};

export const fetchHashTag = (hashTagId) => {
  const queryString = `hashTagId=${hashTagId}`;
  return getData(`/getHashTag?${queryString}`);
};

export const fetchHashTagVideos = (
  hashTag = '',
  pagination = { limit: 10, offset: 0 }
) => {
  const queryString = `hashTag=${hashTag}&limit=${pagination.limit}&offset=${pagination.offset}`;
  return getData(`/getHashTagVideos?${queryString}`);
};

export const fetchSounds = (
  search = '',
  pagination = { limit: 10, offset: 0 }
) => {
  const queryString = `searchString=${search}&limit=${pagination.limit}&offset=${pagination.offset}`;
  return getData(`/getSounds?${queryString}`);
};

export const fetchSound = (soundId = 1) => {
  const queryString = `id=${soundId}`;
  return getData(`/getSound?${queryString}`);
};

export const fetchSoundVideos = (
  hashTag = '',
  pagination = { limit: 10, offset: 0 }
) => {
  const queryString = `hashTag=${hashTag}&limit=${pagination.limit}&offset=${pagination.offset}`;
  return getData(`/getSoundVideos?${queryString}`);
};

export const fetchUsers = (
  search = '',
  pagination = { limit: 10, offset: 0 }
) => {
  const queryString = `searchString=${search}&limit=${pagination.limit}&offset=${pagination.offset}`;
  return getData(`/getUsers?${queryString}`);
};

async function getData(url, params = {}) {
  try {
    const res = await instance.get(url, { params });
    console.log({ Response: res.data.result, url });
    return res;
  } catch (err) {
    console.log({ Error: JSON.stringify(err), url });
    return { data: { result: null, error: 'some error occurred' } };
  }
}
