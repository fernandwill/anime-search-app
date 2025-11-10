import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AnimeSummary, AsyncStatus } from '@/types/anime';

export interface SearchState {
  query: string;
  page: number;
  pageSize: number;
  total: number;
  status: AsyncStatus;
  error?: string;
  results: AnimeSummary[];
  selectedId?: number;
}

const initialState: SearchState = {
  query: '',
  page: 1,
  pageSize: 25,
  total: 0,
  status: 'idle',
  results: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setStatus(state, action: PayloadAction<AsyncStatus>) {
      state.status = action.payload;
    },
    setResults(state, action: PayloadAction<{ items: AnimeSummary[]; total: number }>) {
      state.results = action.payload.items;
      state.total = action.payload.total;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
    selectAnime(state, action: PayloadAction<number | undefined>) {
      state.selectedId = action.payload;
    },
    resetResults(state) {
      state.results = [];
      state.total = 0;
      state.status = 'idle';
      state.error = undefined;
    },
  },
});

export const { setQuery, setPage, setStatus, setResults, setError, selectAnime, resetResults } =
  searchSlice.actions;

export default searchSlice.reducer;
