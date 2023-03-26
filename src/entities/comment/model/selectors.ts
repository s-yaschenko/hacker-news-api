import { RootState } from "../../../types";

export const getCommentsIds = (state: RootState) => state.comments.commentsIds;
export const getFirstLevelCommentsIds = (state: RootState) => state.comments.firstLevelIds;
export const getCommentById = (id: number) => (state: RootState) => state.comments.comments[id];
export const getIsLoading = (state: RootState) => state.comments.isLoading;
