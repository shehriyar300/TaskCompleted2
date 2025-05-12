import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddTask() {
  const [task, setTask] = useState({
    name: "",
    taskDetail: "",
    difficulty: "",
    completed: false,
  });

  const [user, setUser] = useState([]);
  const [local, setLocal] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("User fetch error:", err));
  }, []);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setLocal(savedTasks);
  }, []);

  useEffect(() => {
    if (id) {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const foundTask = savedTasks.find((t) => t.id?.toString() === id);
      if (foundTask) {
        setTask(foundTask);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedTasks;
    if (id) {
      updatedTasks = local.map((t) =>
        t.id?.toString() === id ? { ...task, id: parseInt(id) } : t
      );
    } else {
      const newTask = { ...task, id: Date.now() };
      updatedTasks = [...local, newTask];
    }

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setLocal(updatedTasks);
    navigate("/");
  };

  return (
    <div>
      <h2>{id ? "Edit Task" : "Add Task"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Select User:</label>
          <select
            name="name"
            value={task.name}
            onChange={handleChange}
            required
          >
            <option value="">-- Select User --</option>
            {user.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
          <select
            name="difficulty"
            value={task.difficulty}
            onChange={handleChange}
            required
          >
            <option value="all">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          <option value="Very hard">Very hard</option>
          </select>
          <label>Task Detail:</label>
          <input
            type="text"
            name="taskDetail"
            value={task.taskDetail}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">{id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}
