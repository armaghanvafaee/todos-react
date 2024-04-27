import { useEffect, useReducer, useRef, useState } from "react";
import { toast } from "react-toastify";

import Box from "../base/Box";
import Input from "../base/Input";
import TodoItem from "./TodoItem";
import TodoList from "./TodoList";
import todoReducer from "../../reducer/todoReducer";
import { TodoContext } from "../../contexts/TodoContext";

export default function TodoBox() {
  const [todoList, todoListDispatcher] = useReducer(todoReducer, []);
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
          todoListDispatcher({
            type: "add",
            id: todoList.length + 1,
            title: todoItem,
            status: false,
          });

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


  const fetchData = async () => {
    try {

      const url = new URL("https://66278bb9b625bf088c08bffe.mockapi.io/todos");

      let res = await fetch(url);
      if (res.ok) {
        let todos = await res.json();

        todoListDispatcher({
          type: "initial-todos",
          todoData: todos,
        });
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
      
                <TodoContext.Provider key={index} value={{todo ,todoListDispatcher}}>
                  <TodoItem
                        key={index}
                  
                    
                      />

                </TodoContext.Provider>
    
          ))}
        </TodoList>
      </Box>
    </>
  );
}
