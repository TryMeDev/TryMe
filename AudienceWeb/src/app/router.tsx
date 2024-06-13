import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/error/Error";
import Settings from "../pages/settings/Settings";
import Search from "../pages/search/Search";
import Bookmarks from "../pages/bookmarks/Bookmarks";
import Shared from "../pages/shared/Shared";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      { path: ":adId", element: <Shared /> },
      { path: "bookmarks", element: <Bookmarks /> },
      { path: "search", element: <Search /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export default router;
