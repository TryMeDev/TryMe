import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/error/Error";
import Login from "../pages/login/Login";
import Create from "../pages/create/Create";
import Detail from "../pages/detail/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "create", element: <Create /> },
      { path: "detail/:adId", element: <Detail /> },
    ],
  },
]);

export default router;
