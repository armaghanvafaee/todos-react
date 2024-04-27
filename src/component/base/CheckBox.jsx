import { Link } from "react-router-dom";

export default function CheckBox({ todo, OnchangeHandler }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo?.status}
        onChange={() => OnchangeHandler()}
        className=""
      />
      <Link to={`/todos/${todo.id}`}>
        {" "}
        <p
          className={`inline-block mt-1 ml-2 text-gray-600 ${
            todo?.status ? "line-through" : ""
          }`}
        >
          {todo?.title}
        </p>
      </Link>
    </div>
  );
}
