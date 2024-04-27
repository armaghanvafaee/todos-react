import { useParams } from "react-router-dom";

export default function SingleTodo() {
  const { todoId } = useParams();
  return (
    <>
      <h2> SingleTodo :{todoId}</h2>
    </>
  );
}
