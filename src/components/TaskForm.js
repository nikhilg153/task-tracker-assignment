import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: `flex`, gap: `20px` }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: `10px`, borderRadius: `5px` }}
          />
          <button
            type="submit"
            style={{
              background: `blue`,
              color: `white`,
              borderRadius: `10px`,
              padding: `10px`,
              fontWeight: `bold`,
              cursor: `pointer`,
            }}
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
