import type { AnimeDetails, AnimeSummary } from '@/types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';

interface SearchParams {
  query: string;
  page: number;
  limit: number;
  signal: AbortSignal;
}

interface DetailParams {
  malId: number;
  signal: AbortSignal;
}

interface JikanImageSet {
  image_url?: string;
  small_image_url?: string;
  large_image_url?: string;
}

interface JikanAnime {
  mal_id: number;
  title: string;
  synopsis?: string;
  episodes?: number;
  score?: number;
  season?: string;
  year?: number;
  duration?: string;
  status?: string;
  images?: {
    jpg?: JikanImageSet;
    webp?: JikanImageSet;
  };
  trailer?: {
    url?: string;
  };
  genres?: Array<{
    name: string;
  }>;
}

interface JikanSearchResponse {
  data: JikanAnime[];
  pagination: {
    current_page: number;
    last_visible_page: number;
    has_next_page: boolean;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

interface JikanDetailResponse {
  data: JikanAnime;
}

const buildUrl = (path: string, params?: Record<string, string>) => {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  return url.toString();
};

const mapAnimeSummary = (anime: JikanAnime): AnimeSummary => ({
  malId: anime.mal_id,
  title: anime.title,
  synopsis: anime.synopsis ?? 'Synopsis unavailable.',
  episodes: anime.episodes,
  score: anime.score,
  images: {
    jpg: {
      imageUrl: anime.images?.jpg?.image_url ?? '',
      largeImageUrl: anime.images?.jpg?.large_image_url,
      smallImageUrl: anime.images?.jpg?.small_image_url,
    },
    webp: {
      imageUrl: anime.images?.webp?.image_url ?? '',
      largeImageUrl: anime.images?.webp?.large_image_url,
      smallImageUrl: anime.images?.webp?.small_image_url,
    },
  },
});

const mapAnimeDetails = (anime: JikanAnime): AnimeDetails => ({
  ...mapAnimeSummary(anime),
  trailerUrl: anime.trailer?.url,
  status: anime.status,
  duration: anime.duration,
  genres: anime.genres ?? [],
  year: anime.year,
  season: anime.season,
});

const fetchJson = async <T>(url: string, signal: AbortSignal): Promise<T> => {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    const message = `Jikan API error (${response.status})`;
    throw new Error(message);
  }
  return response.json() as Promise<T>;
};

export const searchAnime = async ({ query, page, limit, signal }: SearchParams) => {
  const url = buildUrl('/anime', {
    q: query,
    page: page.toString(),
    limit: limit.toString(),
    order_by: 'popularity',
    sort: 'desc',
  });

  const data = await fetchJson<JikanSearchResponse>(url, signal);

  return {
    items: data.data.map(mapAnimeSummary),
    pagination: data.pagination,
  };
};

export const getAnimeById = async ({ malId, signal }: DetailParams) => {
  const url = buildUrl(`/anime/${malId}`);
  const data = await fetchJson<JikanDetailResponse>(url, signal);
  return mapAnimeDetails(data.data);
};
