import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, IComment, IStory } from '../../../shared/api';
import { commentsActions } from "./slice";
import { RootState } from "../../../types";
import { isEqualArray } from "../../../shared/helpers";

export const fetchCommentsByIds = createAsyncThunk<void, { commentsIds: number[], isFirstLevel: boolean }, { state: RootState }>
('comments/fetchCommentsByIds', async ({ commentsIds, isFirstLevel }, { dispatch }) => {
  try {
    if (isFirstLevel) {
      dispatch(commentsActions.setIsLoading(true));
    }

    const commentsObj: Record<number, IComment> = {};
    const comments: IComment[] = await api.getItemsByIds(commentsIds);

    comments.forEach((comment) => {
      if (!comment) return;
      commentsObj[comment.id] = comment;
    });

    dispatch(commentsActions.setComments({
      comments: commentsObj,
      commentsIds: commentsIds,
      isFirstLevel,
    }));

    if (isFirstLevel) {
      dispatch(commentsActions.setIsLoading(false));
    }
  } catch (error) {
    console.warn((error as Error).message);
  }
}, {
  condition: (_, { getState }) => {
    const isLoading = getState().comments.isLoading;
    return !isLoading;
  }
});

export const updateCommentsByStoryId = createAsyncThunk<void, { storyId: number }, { state: RootState }>
('comments/updateCommentsByStoryId', async ({ storyId }, { getState, dispatch }) => {
  try {
    const currentCommentsIds = getState().comments.firstLevelIds;
    const story: IStory = await api.getItemById(storyId);

    if (!story.kids) return;
    if (isEqualArray(story.kids, currentCommentsIds)) return;

    const diff = story.kids.filter((id) => !currentCommentsIds.includes(id));

    if (!diff.length) return;

    const commentsObj: Record<number, IComment> = {};
    const comments: IComment[] = await api.getItemsByIds(diff);

    comments.forEach((comment) => {
      if (!comment) return;
      commentsObj[comment.id] = comment;
    });

    dispatch(commentsActions.setComments({
      comments: commentsObj,
      commentsIds: [...currentCommentsIds, ...diff],
      isFirstLevel: true,
    }));

  } catch (error) {
    console.warn((error as Error).message);
  }
});
