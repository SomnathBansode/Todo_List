import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    }
  }, []);

  // Save todos to localStorage every time the todos state changes
  useEffect(() => {
    if (todos.length) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    const t = todos.find((item) => item.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const clearAllTasks = () => {
    setTodos([]);
    localStorage.clear();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-gray-900 text-white min-h-[auto] md:w-1/2">
        <h1 className="font-bold text-center text-xl">
          iTask - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-full px-5 py-1 bg-gray-700 text-white"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 0}
            className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-500 p-2 py-1 text-sm font-bold text-white rounded-md"
          >
            Save
          </button>
        </div>
        <input
          className="my-4"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />{" "}
        Show Finished
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div
          className="todos h-[30vh]"
          style={{
            overflowY: "auto",
          }}
        >
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex md:w-1/2 my-3 justify-between"
                >
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <button
          onClick={clearAllTasks}
          className="mt-4 bg-red-600 hover:bg-red-800 p-2 py-1 text-sm font-bold text-white rounded-md"
        >
          Clear All Tasks
        </button>
      </div>
    </>
  );
}

export default App;
