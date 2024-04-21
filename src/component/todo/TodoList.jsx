import Todo from "./TodoItem";

export default function TodoList({ children }) {

  return (
    <>
      <ul className="list-reset">{children}</ul>
    </>
  );
}
