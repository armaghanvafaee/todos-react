export default function todoReducer(todoList, action) {
  switch (action?.type) {
    case "add":
      return [
        ...todoList,
        {
          id: action?.id,
          title: action?.title,
          status: action?.status,
        },
      ];
    case "initial-todos":
      return [...todoList, ...action.todoData];

    case "delete":
      return   todoList.filter((todoItem) => {
        return action.id != todoItem.id;
      });

    case "changestatus":
      return todoList.map((item) => {
        if (item.id === action.id) {
          item.status = !item.status;
        }
        return item;
      });

    case "update":
      return todoList.map((todoItem) => {
        if (action.id === todoItem.id) {
          todoItem.title = action.title;
        }
        return todoItem;
     
      });

    default:
      return todoList;
  }
}
