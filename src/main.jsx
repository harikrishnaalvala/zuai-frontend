import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import Layout from "./components/Layout/Layout.jsx";
import BlogDetails from "./components/blogs/BlogDetails.jsx";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/posts/:id",
        element: <BlogDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={appRoutes} />
  </Provider>
);
