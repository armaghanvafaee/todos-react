import {  useEffect,useState } from "react";
import CheckBox from "../base/CheckBox";
import EditButton from "../base/EditButton";
import Input from "../base/Input";
import RemoveBtton from "../base/RemoveButton";
export default function Todo({
  todo,
  RemoveTodoItem,
  OnchangeHandler ,
  EditToDoItem

}) {
  const [editMode, setEditMode] = useState(false);
  const [todoItem, setTodoItem] = useState(todo?.title);
  const OnKeyDown = () => {
    if (todoItem !== "") {
    
      todo.title=todoItem;
      EditToDoItem
      setEditMode(false);
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
            <RemoveBtton onClickEvent={()=>setEditMode(false)} />
          </div>
        ) : (
          <div className="w-full flex items-center"> 
            <CheckBox
              text={todo?.title}
              status={todo?.status}
              OnchangeHandler={OnchangeHandler}
            />
            <button
              type="button"
              className="absolute right-0 flex items-center  space-x-1"
            >
              <EditButton OnclickEvent={() =>setEditMode(true)} />
              <RemoveBtton onClickEvent={() => RemoveTodoItem()} />
            </button>
          </div>
        )}
      </li>
    </>
  );
}
