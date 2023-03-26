import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../../shared/api";

interface CommentsState {
  firstLevelIds: number[],
  comments: Record<number, IComment>,
  commentsIds: number[],
  isLoading: boolean,
}

const initialState: CommentsState = {
  firstLevelIds: [],
  comments: {},
  commentsIds: [],
  isLoading: false,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<{ comments: Record<number, IComment>, commentsIds: number[], isFirstLevel: boolean }>) {
      if (action.payload.isFirstLevel) {
        state.firstLevelIds = action.payload.commentsIds;
      }

      state.comments = { ...state.comments, ...action.payload.comments};
      state.commentsIds = [...state.commentsIds, ...action.payload.commentsIds];
      state.isLoading = false;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    clear(state) {
      state.firstLevelIds = [];
      state.commentsIds = [];
      state.comments = {};
      state.isLoading = false;
    }
  }
});

export const commentsReducer = commentsSlice.reducer;
export const commentsActions = commentsSlice.actions;
