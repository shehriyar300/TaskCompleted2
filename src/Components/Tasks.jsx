import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  const handleDelete = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updated));
    setTasks(updated);
  };

  const handleComplete = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updated));
    setTasks(updated);
  };

  const handleEdit = (id) => {
    navigate(`/add/${id}`);
  };

  const filteredTasks = tasks
    .filter((task) => task.name.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => {
      if (statusFilter === "completed") return task.completed;
      if (statusFilter === "incomplete") return !task.completed;
      return true;
    })
    .filter((task) => {
      if (difficultyFilter === "all") return true;
      return task.difficulty === difficultyFilter;
    });

  return (
    <div>
      <h2>All Tasks</h2>

      <div className="filtr">
        <input
          type="text"
          placeholder="Ada görə axtar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

       
        <select
          onChange={(e) => setDifficultyFilter(e.target.value)}
          value={difficultyFilter}
        >
          <option value="all">Bütün çətinliklər</option>
          <option value="Yüngül">Yüngül</option>
          <option value="Orta">Orta</option>
          <option value="Biraz çətin">Biraz çətin</option>
          <option value="Çətin">Çətin</option>
        </select>
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="all">Hamısı</option>
          <option value="completed">Tamamlananlar</option>
          <option value="incomplete">Tamamlanmayanlar</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p>Heç bir tapşırıq tapılmadı.</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li
              className={task.completed ? "completed" : "incomplete"}
              key={task.id}
            >
              <strong>{task.name}</strong> - <p>{task.taskDetail}</p>
              <br />
              Çətinlik: {task.difficulty || "Yoxdur"}
              <br />
              <span>
                Status: {task.completed ? "Tamamlandı" : "Tamamlanmayıb"}
              </span>
              <div className="button-group">
                <button className="btn" onClick={() => handleEdit(task.id)}>
                  Edit
                </button>
                <button className="btn" onClick={() => handleDelete(task.id)}>
                  Delete
                </button>
                <button className="btn" onClick={() => handleComplete(task.id)}>
                  {task.completed ? "Geri al" : "Tamamla"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
