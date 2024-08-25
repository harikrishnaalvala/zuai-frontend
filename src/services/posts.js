import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://zuai-backend-1.onrender.com/api/",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Post"],
    }),

    getSinglePost: builder.query({
      query: (id) => `/posts/${id}`,
    }),

    createPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),

    updatePost: builder.mutation({
      query: ({ id, ...updatedPost }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: updatedPost,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetSinglePostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
