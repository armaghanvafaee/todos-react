import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import Box from "../base/Box";
import Input from "../base/Input";
import Todo from "./TodoItem";
import TodoList from "./TodoList";

export default function TodoBox() {
  const [todoList, setTodoList] = useState([]);
  const [todoItem, setTodoItem] = useState("");
  const myref = useRef("Hello Armaghan");

  const OnKeyDown = async () => {
    let data = { id: todoList.length + 1, title: todoItem, status: false };
    try {
      let res = await fetch(
        "https://66278bb9b625bf088c08bffe.mockapi.io/todos",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data),
        }
      );
      if (res.ok) {
        let todoData = await res.json();

        if (todoData !== null) {
          setTodoList((current) => [...current, todoData]);
          setTodoItem("");
          toast.success("Create todos succesfully");
        }
      } else {
        toast.error("Error in Create todos ! ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RemoveTodoItem = async (todo) => {
    try {
      const url = new URL(
        `https://66278bb9b625bf088c08bffe.mockapi.io/todos/${todo?.id}`
      );

      let res = await fetch(url, {
        method: "DELETE",
      });
      if (res.ok) {
        let newList = todoList.filter((todoItem) => {
          return todo.id != todoItem.id;
        });

        setTodoList(newList);
        toast.success("Removed todos succesfully");
      } else {
        toast.error("Error in Removed todos ! ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ChangeStatusHandler = async (todo) => {
    try {
      const url = new URL(
        `https://66278bb9b625bf088c08bffe.mockapi.io/todos/${todo?.id}`
      );

      let res = await fetch(url, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: !todo.status }),
      });
      if (res.ok) {
        let newTodo = todoList.map((item) => {
          if (item.id === todo.id) {
            item.status = !todo.status;
          }
          return item;
        });

        setTodoList(newTodo);
        toast.success("status changed succesfully");
      } else {
        toast.error("Error in change status ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const EditTodoItem = async (todo) => {
    try {
      const url = new URL(
        `https://66278bb9b625bf088c08bffe.mockapi.io/todos/${todo?.id}`
      );

      let res = await fetch(url, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: todo.title }),
      });
      if (res.ok) {
        // let newList = todoList.filter((todoItem) => {
        //   if (todo.id === todoItem.id) {
        //     todoItem.title = todo.item;
        //   }
        //   return;
        // });

        // setTodoList(newList);
        toast.success("Edit Todos succesfully");
      } else {
        toast.error("Error in Edit Todos ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const url = new URL("https://66278bb9b625bf088c08bffe.mockapi.io/todos");

      let res = await fetch(url);
      if (res.ok) {
        let todos = await res.json();
        setTodoList(todos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
