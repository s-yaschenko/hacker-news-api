import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchStoriesInPortions } from "./thunks";
import type { IStory } from '../../../shared/api';

interface StoriesState {
  stories: Record<number, IStory>;
  storiesIds: number[];
  isLoading: boolean;
  newStories: Record<number, IStory>;
  newStoriesIds: number[];
  isLoadingNewStories: boolean;
  intervalId: number;
}

const initialState: StoriesState = {
  storiesIds: [],
  stories: {},
  newStoriesIds: [],
  newStories: {},
  isLoading: false,
  isLoadingNewStories: false,
  intervalId: 0,
}

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    addStories(state, action: PayloadAction<{ stories: Record<number, IStory>, storiesIds: number[]}>) {
      state.storiesIds = [ ...state.storiesIds, ...action.payload.storiesIds ];
      state.stories = { ...state.stories, ...action.payload.stories };

      if (state.isLoading) {
        state.isLoading = false;
      }
    },
    addNewStories(state, action: PayloadAction<{ stories: Record<number, IStory>, storiesIds: number[]}>) {
      state.newStoriesIds = [  ...action.payload.storiesIds, ...state.newStoriesIds];
      state.newStories = {  ...action.payload.stories, ...state.newStories};
    },
    setIsLoadingNewStories(state, action: PayloadAction<boolean>) {
      state.isLoadingNewStories = action.payload;
    },
    showNewStories(state) {
      const countIds = state.storiesIds.length;
      const storiesIds = [...state.newStoriesIds, ...state.storiesIds];
      const stories = { ...state.newStories, ...state.stories };

      const removedIds = storiesIds.splice(countIds - 1, storiesIds.length - countIds);

      removedIds.forEach((id) => {
        delete stories[id];
      });

      state.storiesIds = storiesIds;
      state.stories = stories;
      state.newStoriesIds = [];
      state.newStories = {};
    },
    setIntervalId(state, action: PayloadAction<number>) {
      state.intervalId = action.payload;
    },
    clear(state) {
      clearInterval(state.intervalId);
      state.storiesIds = [];
      state.stories = {};
      state.newStoriesIds = [];
      state.newStories = {};
      state.intervalId = 0;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStoriesInPortions.pending, (state) => {
      state.isLoading = true;
    });
  }
});

export const storiesReducer = storiesSlice.reducer;
export const storiesActions = storiesSlice.actions;

