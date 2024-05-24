import { useState, useRef, useEffect } from "react";
import "./App.css";
// import { set } from "mongoose";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:8080/api/todos"
  : "https://todos-fullstack.onrender.com/api/todos";
console.log(import.meta.env.DEV);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      try {
        setIsLoading(true);
        const response = await fetch(BASE_URL);
        const data = await response.json();
        console.log(data);
        setTodos(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    getTodos();
  }, []);

  const textRef = useRef();
  const completeRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      text: textRef.current.value,
      completed: completeRef.current.checked,
      user: "bob",
    };

    try {
      const response = await fetch(BASE_URL, {
        //Post request
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      textRef.current.value = "";
      completeRef.current.checkbox = false;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    console.log(body, JSON.stringify(body));
  };

  async function handleDelete(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      setTodos(todos.filter((todo) => todo._id != id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <label>
          I want to:
          <br />
          <input type="text" ref={textRef} />
        </label>
        <label>
          <input type="checkbox" ref={completeRef} />
        </label>
        <br />
        <br />
        <button>Add To Do</button>
      </form>
      <br />
      <br />
      {isLoading
        ? "Loading..."
        : todos.map((todo) => (
            <p
              style={{ textDecoration: todo.completed ? "line-through" : "" }}
              key={todo._id}
            >
              {todo.text}
              <span
                onClick={() => handleDelete(todo._id)}
                style={{
                  marginLeft: "10px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                X
              </span>
            </p>
          ))}
    </>
  );
}

export default App;
