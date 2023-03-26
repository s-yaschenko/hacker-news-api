import { RootState } from "../../../types";
import { createSelector } from "@reduxjs/toolkit";

export const getStoriesIds = (state: RootState) => state.stories.storiesIds;
export const getStoryById = (id: number) => (state: RootState) => state.stories.stories[id];
export const getIsLoading = (state: RootState) => state.stories.isLoading;
export const getIsNewStories = (state: RootState) => Boolean(state.stories.newStoriesIds.length);
export const getIsLoadingNewStories = (state: RootState) => state.stories.isLoadingNewStories;

export const getIsShowNewStories = createSelector(getIsNewStories, getIsLoadingNewStories, (isNewStories, isLoadingNewStories) => {
  return isNewStories && !isLoadingNewStories;
});
