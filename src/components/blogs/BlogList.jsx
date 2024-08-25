import { useState } from "react";
import BlogCard from "./BlogCard";
import { useGetAllPostsQuery } from "../../services/posts";
import ShimmerCard from "../common/ShimmerCard";

const BlogList = () => {
  const [search, setSearch] = useState("");

  const {
    data: postsData,
    isLoading,
    isSuccess,
    error,
  } = useGetAllPostsQuery();

  const filteredBlogs = isSuccess
    ? postsData.posts.filter(
        (blog) =>
          blog.title.toLowerCase().includes(search.toLowerCase()) ||
          blog.author.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 font-mono">
        Featured Blogs
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for blogs by title or author"
          onChange={(e) => setSearch(e.target.value)}
          className="px-2 py-2 md:px-4 md:py-4 outline-none border border-black text-base w-2/3 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ShimmerCard key={index} />
            ))
          : isSuccess && filteredBlogs.length > 0
          ? filteredBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          : error && (
              <p className="text-center text-red-500">
                Error loading blogs. Please try again later.
              </p>
            )}
        {!isLoading && isSuccess && filteredBlogs.length === 0 && (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
