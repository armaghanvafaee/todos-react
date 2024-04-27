import TodoBox from "./component/todo/TodoBox";
import { UserContext } from "./contexts/UserContext";

function App() {
  const user = { name: "armaghan", family: "vafaee" };

  return (
    <>
      <div className="bg-gray-100">
        <UserContext.Provider value={user}>
          <TodoBox />
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
