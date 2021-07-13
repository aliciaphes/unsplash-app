// API docs: https://unsplash.com/documentation

export type Photo = {
  id: string;
  width: number;
  height: number;
  liked_by_user: boolean;
  urls: { regular: string; raw: string };
  alt_description: string;
};

export type SearchPhotosResponse = {
  total: number;
  results: Photo[];
  errors: string[];
};

const PHOTOS_PER_PAGE = 12;
const ACCESS_TOKEN =
  'e8cacfbb88f06b3fd59cb6a74ba15075f1140fcb5578a54f0e68a55a0279f275';

export const getSearchPhotos = (query: string) => {
  const url = `https://api.unsplash.com/search/photos?per_page=${PHOTOS_PER_PAGE}&query=${encodeURIComponent(
    query,
  )}`;
  return fetch(url, {
    headers: { Authorization: `Client-ID ${ACCESS_TOKEN}` },
  }).then(response => response.json() as Promise<SearchPhotosResponse>);
};
