export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AnimeImage {
  imageUrl: string;
  smallImageUrl?: string;
  largeImageUrl?: string;
}

export interface AnimeSummary {
  malId: number;
  title: string;
  synopsis?: string;
  episodes?: number;
  score?: number;
  images?: {
    jpg?: AnimeImage;
    webp?: AnimeImage;
  };
}

export interface AnimeDetails extends AnimeSummary {
  trailerUrl?: string;
  status?: string;
  duration?: string;
  genres?: Array<{ name: string }>;
  year?: number;
}

export interface SearchResponse {
  data: AnimeSummary[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}
