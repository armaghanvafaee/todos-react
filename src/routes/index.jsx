import { createBrowserRouter } from "react-router-dom";
import About from "./About";
import Todos from "./Todos";
import Root from "./Root";
import Home from "./Home";
import SingleTodo from "./SingleTodo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/todos",
        element: <Todos />,
      },
      {
        path: "/todos/:todoId",
        element: <SingleTodo/>
      },
      { path: "/about", element: <About /> },
    ],
  },
]);

export default router;
