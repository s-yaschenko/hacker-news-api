import { configureStore } from "@reduxjs/toolkit";
import { storiesReducer } from "../entities/story";
import { commentsReducer } from "../entities/comment";

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
    comments: commentsReducer,
  }
});
