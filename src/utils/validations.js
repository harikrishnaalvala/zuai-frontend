import * as Yup from "yup";

export const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters")
    .required("Title is required"),
  content: Yup.string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required"),
  author: Yup.string().required("Author is required"),
});


export const validationSchemaSignup = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });