import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

export default function EditTask() {
  const { id } = useParams();  
  const [task, setTask] = useState({
    name: "",
    taskDetail: "",
    difficulty: "",
    completed: false,
  });
  const [user, setUser] = useState([]);
  const [local, setLocal] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("User fetch error:", err));
  }, []);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setLocal(savedTasks);
  }, []);

  useEffect(() => {
    if (id && local.length > 0) {
      const selectedTask = local.find((task) => task.id.toString() === id);
      if (selectedTask) {
        setTask(selectedTask);  
      }
    }
  }, [id, local]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "completed") {
      setTask({ ...task, completed: value === "true" }); // string -> boolean
    } else {
      setTask({ ...task, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTasks = local.map((item) =>
      item.id.toString() === id ? { ...item, ...task } : item
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setLocal(updatedTasks);
    navigate("/"); 
  };

  return (
    <div>
      <h2>Edit Task</h2>

      {task && (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Select User:</label>
            <select
              name="name"
              value={task.name}
              onChange={handleChange}
              required
            >
              {user.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>

            <label>Task Detail:</label>
            <input
              type="text"
              name="taskDetail"
              value={task.taskDetail}
              onChange={handleChange}
              required
            />

            <label>Difficulty:</label>
            <select
              name="difficulty"
              value={task.difficulty}
              onChange={handleChange}
              required
            >
              <option value="Yüngül">Yüngül</option>
              <option value="Orta">Orta</option>
              <option value="Biraz çətin">Biraz çətin</option>
              <option value="Çətin">Çətin</option>
            </select>

            <label>Status:</label>
            <select
              name="completed"
              value={task.completed.toString()} // boolean -> string
              onChange={handleChange}
              required
            >
              <option value="false">Tamamlanmayıb</option>
              <option value="true">Tamamlanıb</option>
            </select>
          </div>

          <button type="submit">
            Update Task
          </button>
        </form>
      )}
    </div>
  );
}
