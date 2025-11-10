import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAnimeById, searchAnime } from '@/services/jikanClient';
import type { AnimeDetails, AnimeSummary, AsyncStatus } from '@/types/anime';

export const fetchAnimeSearch = createAsyncThunk(
  'search/fetchAnimeSearch',
  async (
    params: { query: string; page: number; limit: number },
    thunkAPI,
  ): Promise<{
    items: AnimeSummary[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> => {
    const data = await searchAnime({ ...params, signal: thunkAPI.signal });
    const total = data.pagination.items.total;
    const totalPages = data.pagination.last_visible_page || Math.ceil(total / params.limit) || 0;
    return {
      items: data.items,
      total,
      totalPages,
      currentPage: data.pagination.current_page,
    };
  },
);

export const fetchAnimeDetails = createAsyncThunk(
  'search/fetchAnimeDetails',
  async (params: { malId: number }, thunkAPI): Promise<AnimeDetails> => {
    return getAnimeById({ ...params, signal: thunkAPI.signal });
  },
);

export interface SearchState {
  query: string;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  status: AsyncStatus;
  detailStatus: AsyncStatus;
  error?: string;
  detailError?: string;
  results: AnimeSummary[];
  detail?: AnimeDetails;
}

const initialState: SearchState = {
  query: '',
  page: 1,
  pageSize: 25,
  total: 0,
  totalPages: 0,
  status: 'idle',
  detailStatus: 'idle',
  results: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.page = 1;
      state.error = undefined;
      if (!action.payload.trim()) {
        state.results = [];
        state.total = 0;
        state.totalPages = 0;
        state.status = 'idle';
      }
    },
    setPage(state, action: PayloadAction<number>) {
      const nextPage = Math.max(1, Math.min(action.payload, state.totalPages || action.payload));
      state.page = nextPage;
    },
    setPageSize(state, action: PayloadAction<number>) {
      const normalized = Math.max(1, Math.min(action.payload, 25));
      state.pageSize = normalized;
      state.page = 1;
    },
    resetResults(state) {
      state.results = [];
      state.total = 0;
      state.totalPages = 0;
      state.status = 'idle';
      state.error = undefined;
    },
    clearDetail(state) {
      state.detail = undefined;
      state.detailStatus = 'idle';
      state.detailError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeSearch.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(fetchAnimeSearch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload.items;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.currentPage;
      })
      .addCase(fetchAnimeSearch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unable to fetch anime.';
      })
      .addCase(fetchAnimeDetails.pending, (state) => {
        state.detailStatus = 'loading';
        state.detailError = undefined;
      })
      .addCase(fetchAnimeDetails.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded';
        state.detail = action.payload;
      })
      .addCase(fetchAnimeDetails.rejected, (state, action) => {
        state.detailStatus = 'failed';
        state.detailError = action.error.message ?? 'Unable to load details.';
      });
  },
});

export const { setQuery, setPage, setPageSize, resetResults, clearDetail } = searchSlice.actions;

export default searchSlice.reducer;
