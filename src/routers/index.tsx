import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { MovieDetail } from "../pages/MovieDetail";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movie-detail/:movieId",
    element: <MovieDetail />,
  },
]);

export default router;
