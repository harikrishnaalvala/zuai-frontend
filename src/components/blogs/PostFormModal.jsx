import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../../services/posts";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseModal } from "../../features/posts/postsSlice";
import { validationSchema } from "../../utils/validations";

const PostFormModal = ({ post }) => {
  const [
    createPost,
    {
      isLoading: isCreating,
      isSuccess: isCreateSuccess,
      isError: isCreateError,
      reset: resetCreateMutation,
    },
  ] = useCreatePostMutation();

  const [
    updatePost,
    {
      isLoading: isUpdating,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      reset: resetUpdateMutation,
    },
  ] = useUpdatePostMutation();

  const isOpen = useSelector((store) => store.posts.isModalOpen);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const isEditMode = !!post;

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (isEditMode) {
        await updatePost({ id: post._id, ...values }).unwrap();
      } else {
        await createPost(values).unwrap();
      }
      resetForm();
    } catch (error) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} post:`,
        error
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    dispatch(handleCloseModal());
    resetCreateMutation();
    resetUpdateMutation();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">
          {isEditMode ? "Update Post" : "Create Post"}
        </h2>
        <Formik
          initialValues={{
            title: post?.title || "",
            content: post?.content || "",
            author: post?.author || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <Field
                  name="title"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Content</label>
                <Field
                  name="content"
                  as="textarea"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Author</label>
                <Field
                  name="author"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
                <ErrorMessage
                  name="author"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isCreating || isUpdating}
                  className="px-4 py-2 bg-[#6361eb] text-white rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                >
                  {isSubmitting || isCreating || isUpdating
                    ? "Submitting..."
                    : isEditMode
                    ? "Update Post"
                    : "Create Post"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {isCreateError && (
          <p className="text-red-600 mt-2">Failed to create post</p>
        )}
        {isUpdateError && (
          <p className="text-red-600 mt-2">Failed to update post</p>
        )}
        {isCreateSuccess && (
          <p className="text-green-600 mt-2">Post created successfully</p>
        )}
        {isUpdateSuccess && (
          <p className="text-green-600 mt-2">Post updated successfully</p>
        )}
      </div>
    </div>
  );
};

export default PostFormModal;
