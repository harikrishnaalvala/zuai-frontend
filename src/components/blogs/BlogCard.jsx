import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSelectedPost } from "../../features/posts/postsSlice";
import { useDeletePostMutation } from "../../services/posts";

const BlogCard = ({ blog }) => {
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const dispatch = useDispatch();

  const handleEdit = (post) => {
    dispatch(setSelectedPost(post));
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id).unwrap();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const truncateContent = (content, wordLimit) => {
    const words = content.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return content;
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 h-full">
      <div className="p-6 flex-1">
        <h3 className="text-2xl font-bold  mb-2">{blog.title}</h3>
        <p className="text-gray-700 mb-4">
          {truncateContent(blog.content, 30)}
        </p>
        <p className="text-gray-500 text-sm">By {blog.author}</p>
      </div>
      <div className="p-6 flex justify-between items-center">
        <Link
          to={`/posts/${blog._id}`}
          className="text-lg font-semibold text-blue-600 hover:text-blue-800"
        >
          Read More →
        </Link>
        <div className="space-x-4">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => handleEdit(blog)}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          <button
            onClick={() => handleDelete(blog._id)}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-full"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
