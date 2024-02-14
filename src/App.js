import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8000/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async (title) => {
    try {
      const response = await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setNotification("Task added successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  const completeTask = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/tasks/${id}/complete`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to complete task");
      }
      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      setNotification("Task marked as completed.");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks(tasks.filter((task) => task.id !== id));
      setNotification("Task deleted successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        alignItems: `center`,
        justifyContent: `center`,
        display: `flex`,
        flexDirection: `column`,
      }}
    >
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onComplete={completeTask} onDelete={deleteTask} />
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default App;
