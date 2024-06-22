import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/error/Error";
import Login from "../pages/login/Login";
import Create from "../pages/create/Create";
import Detail from "../pages/detail/Detail";
import AboutUs from "../pages/aboutus/AboutUs";
import Instructions from "../pages/instructions/Instructions";
import FAQ from "../pages/faq/FAQ";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "create", element: <Create /> },
      { path: "detail/:adId", element: <Detail /> },
      { path: "faq", element: <FAQ /> },
      { path: "instructions", element: <Instructions /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

export default router;
