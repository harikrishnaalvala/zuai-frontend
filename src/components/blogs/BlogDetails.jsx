import { useParams } from "react-router-dom";
import { useGetSinglePostQuery } from "../../services/posts";
import ShimmerCard from "../common/ShimmerCard";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: postData,
    isError,
    isLoading,
    isSuccess,
  } = useGetSinglePostQuery(id);

  const { content, author, title, createdAt } = postData?.post || {};

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && (
        <div className="max-w-3xl mx-auto">
          <ShimmerCard />
        </div>
      )}

      {isError && (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-500">
              We couldn't load the blog details. Please try again later.
            </p>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              By {author} | {formattedDate}
            </p>
            <div className="text-gray-700 leading-relaxed">{content}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
