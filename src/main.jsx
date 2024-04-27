import ReactDOM from "react-dom/client";
import "./index.css";

import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import AppRouter from './routes'



ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={AppRouter} />
  </>
);
