import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "../services/posts";
import postsReducer from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});
