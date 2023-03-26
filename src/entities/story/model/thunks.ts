import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, IStory } from '../../../shared/api';
import { storiesActions } from "./slice";
import { RootState } from "../../../types";
import { isEqualArray } from "../../../shared/helpers";
import { INTERVAL_LOADING } from "../../../constants";

export const fetchStoriesInPortions = createAsyncThunk<void, { portionsSize: number }, { state: RootState }>
('story/fetchStoriesInPortions', async ({ portionsSize }, { dispatch, getState }) => {
  try {
    let intervalId = getState().stories.intervalId;

    if (intervalId) {
      clearInterval(intervalId);
      dispatch(storiesActions.clear());
    }

    const storiesIds = await api.getNewStoriesIds();

    await load(true);

    intervalId = setInterval(async () => {
      await load(false);

    }, INTERVAL_LOADING);

    dispatch(storiesActions.setIntervalId(intervalId));

    async function load(isFirstLoad: boolean) {
      const storiesObj: Record<number, IStory> = {};
      const ids = storiesIds.splice(0, portionsSize);
      const stories: IStory[] = await api.getItemsByIds(ids);

      stories.forEach(( story ) => {
        if (!story) return;
        storiesObj[story.id] = story
      });

      if (!getState().stories.intervalId && !isFirstLoad) return;

      dispatch(storiesActions.addStories({
        stories: storiesObj,
        storiesIds: ids,
      }));

      if (!storiesIds.length) {
        clearInterval(intervalId);
        dispatch(storiesActions.setIntervalId(0));
      }
    }
  } catch (error) {
    console.warn((error as Error).message);
  }
}, {
  condition: (_, { getState }) => {
    const isLoading = getState().stories.isLoading;
    return !isLoading;
  }
});

export const backgroundUpdateStories = createAsyncThunk<void, void, { state: RootState }>
('story/backgroundUpdateStories', async (_, { dispatch, getState }) => {
  try {
    const currentStoriesIds = getState().stories.storiesIds;
    const currentNewStoriesIds = getState().stories.newStoriesIds;
    const actualStoriesIds = [...currentNewStoriesIds, ...currentStoriesIds].slice(0, currentStoriesIds.length);
    const storiesIds = await api.getNewStoriesIds();

    if (isEqualArray(storiesIds, actualStoriesIds)) return;

    const differenceIds = storiesIds.filter((id) => !actualStoriesIds.includes(id));

    dispatch(storiesActions.setIsLoadingNewStories(true));

    const storiesObj: Record<number, IStory> = {};
    const stories: IStory[] = await api.getItemsByIds(differenceIds);

    stories.forEach(( story ) => {
      if (!story) return;
      storiesObj[story.id] = story
    });

    dispatch(storiesActions.addNewStories({
      stories: storiesObj,
      storiesIds: differenceIds
    }));

    dispatch(storiesActions.setIsLoadingNewStories(false));
  } catch (error) {
    console.warn((error as Error).message);
  }
});
