import { useState } from "react";
import Box from "../base/Box";
import Input from "../base/Input";
import Todo from "./TodoItem";
import TodoList from "./TodoList";

export default function TodoBox() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Learning React", status: true },
    { id: 2, title: "Learning Tailwind", status: false },
  ]);
  const [todoItem, setTodoItem] = useState("");

  const OnKeyDown = () => {
    if (todoItem !== "") {
      setTodoList((current) => [
        ...current,
        ...[{ id: todoList.length + 1, title: todoItem, status: false }],
      ]);
      setTodoItem("");
    }
  };

  const RemoveTodoItem = (todo) => {
    let newList = todoList.filter((todoItem) => {
      return todo.id != todoItem.id;
    });

    setTodoList(newList);
  };

  const ChangeStatusHandler = (todo) => {
    let newTodo = todoList.map((item) => {
      if (item.id === todo.id) {
        item.status = !todo.status;
      }
      return item;
    });

    setTodoList(newTodo);
  };

  const EditTodoItem = (todo) => {
    let newList = todoList.filter((todoItem) => {
      if( todo.id === todoItem.id){
        todoItem.title=todo.item

      }
      return;
    });

    setTodoList(newList);
  };

  return (
    <>
      <Box title="TO DO APP">
        <Input
          value={todoItem}
          placeholder="What needs to be done today?"
          onChange={setTodoItem}
          onKeyDown={OnKeyDown}
        />
        <TodoList>
          {todoList.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              RemoveTodoItem={RemoveTodoItem.bind(this, todo)}
              OnchangeHandler={ChangeStatusHandler.bind(this, todo)}
              EditToDoItem={EditTodoItem.bind(this, todo)}
  
            />
          ))}
        </TodoList>
      </Box>
    </>
  );
}
