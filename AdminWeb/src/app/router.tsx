import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/error/Error";
import Login from "../pages/login/Login";
import Categories from "../pages/categories/Categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "categories", element: <Categories /> },
    ],
  },
]);

export default router;
