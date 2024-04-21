
import ReactDOM from "react-dom/client";
import "./index.css";

import TodoBox from "./component/todo/TodoBox";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="bg-gray-100">
    <TodoBox />
  </div>
);
