import { useContext, useState } from "react";
import CheckBox from "../base/CheckBox";
import EditButton from "../base/EditButton";
import Input from "../base/Input";
import RemoveBtton from "../base/RemoveButton";
import { UserContext } from "../../contexts/UserContext";
import { TodoContext } from "../../contexts/TodoContext";
import { toast } from "react-toastify";
export default function TodoItem() {
  const user = useContext(UserContext);
  const { todo, todoListDispatcher } = useContext(TodoContext);

  const [editMode, setEditMode] = useState(false);
  const [todoItem, setTodoItem] = useState(todo?.title);




  const RemoveTodoItem = async (todo) => {
    try {
      console.log(todo);
      const url = new URL(
        `https://66278bb9b625bf088c08bffe.mockapi.io/todos/${todo?.id}`
      );

      let res = await fetch(url, {
        method: "DELETE",
      });
      if (res.ok) {
        todoListDispatcher({
          type: "delete",
          id: todo.id,
        });

        toast.success("Removed todos succesfully");
      } else {
        toast.error("Error in Removed todos ! ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const EditTodoItem = async (todo) => {
    try {
      console.log(todo);
      const url = new URL(
        `https://66278bb9b625bf088c08bffe.mockapi.io/todos/${todo?.id}`
      );

      let res = await fetch(url, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: todo.title }),
      });
      if (res.ok) {
        todoListDispatcher({
          type: "update",
          id: todo.id,
          title: todo.title,
        });

      
        toast.success("Edit Todos succesfully");
      } else {
        toast.error("Error in Edit Todos ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const OnKeyDown = () => {
    if (todoItem !== "") {
      console.log(todoItem)
      todo.title = todoItem;
      EditTodoItem(todo);
      setEditMode(false);
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
        todoListDispatcher({
          type: "changestatus",
          id: todo.id,
        });

        toast.success("status changed succesfully");
      } else {
        toast.error("Error in change status ");
      }
    } catch (error) {
      console.log(error);
    }
  };


  // useEffect(()=>{

  //   console.log(`the component created! => ${todo.title}`);

  //   return()=>{
  //     console.log(`the component deleted! => ${todo.title}`);

  //   }

  //     },[])

  return (
    <>
      <li
        key={todo?.id}
        className="relative flex items-center justify-between px-2 py-6 border-b"
      >
        {editMode ? (
          <div className="w-full flex items-center">
            <Input
              value={todoItem}
              onChange={setTodoItem}
              onKeyDown={OnKeyDown}
            />
            <RemoveBtton onClickEvent={() => setEditMode(false)} />
          </div>
        ) : (
          <div className="w-full flex items-center">
            <CheckBox
              text={todo?.title}
              status={todo?.status}
              OnchangeHandler={()=>ChangeStatusHandler(todo)}
            />
            <button
              type="button"
              className="absolute right-0 flex items-center  space-x-1"
            >
              <EditButton OnclickEvent={() => setEditMode(true)} />
              <RemoveBtton onClickEvent={() => RemoveTodoItem(todo)} />
            </button>
          </div>
        )}
      </li>
    </>
  );
}
