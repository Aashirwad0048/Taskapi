import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return alert("Enter a task");

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    });

    setTitle("");
    fetchTasks();
  };

const toggleTask = async (task) => {
  await fetch(`${API_URL}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      completed: !task.completed
    })
  });

  fetchTasks();
};


  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    fetchTasks();
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", fontFamily: "Arial" }}>
      <h2>React Task Manager</h2>

      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginTop: "10px" }}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginRight: "10px"
              }}
            >
              {task.title}
            </span>

            <button onClick={() => toggleTask(task)}>
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
