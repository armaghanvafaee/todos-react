import { useEffect, useRef, useState } from "react";

import Box from "../base/Box";
import Input from "../base/Input";
import Todo from "./TodoItem";
import TodoList from "./TodoList";

export default function TodoBoxWithLocalStorage() {
  const [todoList, setTodoList] = useState([]);
  const [todoItem, setTodoItem] = useState("");
  const myref=useRef("Hello Armaghan");


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
      if (todo.id === todoItem.id) {
        todoItem.title = todo.item;
      }
      return;
    });

    setTodoList(newList);
  };

  useEffect(() => {
    setTodoList(JSON.parse(localStorage.getItem("todos_list")) ?? []);
  }, []);

  useEffect(() => {
    todoList.map((todo, index) => {
      localStorage.setItem(`nameItem${index}`, todo.title);
      localStorage.setItem("todos_list", JSON.stringify(todoList));
    });

    return () => {
      todoList.map((todo, index) => {
        localStorage.removeItem(`nameItem${index}`);
      });
    };
  }, [todoList]);

  return (
    <>
      <Box title={`TO DO APP :${myref.current}`}>
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
