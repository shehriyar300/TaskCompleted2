import React from "react";
import { BrowserRouter as Router, Routes, Route ,Link } from "react-router-dom";
import Home from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import EditTask from "./Components/EditTask"; 
import "./App.css";

function App() {
  return (
    <Router>
      <nav >
        <ul className="navbar">
          <li className="home">
            <Link to="/"><p>Home</p></Link>
          </li>
          <li className="add">
            <Link to="/add"><p>Add Task</p></Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/add/:id" element={<EditTask />} /> 
      </Routes>
    </Router>
  );
}

export default App;
