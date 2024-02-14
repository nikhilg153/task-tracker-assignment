import React from "react";

const TaskList = ({ tasks, onComplete, onDelete }) => {
  return (
    <div>
      <h2>Tasks List</h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              background: `gray`,
              padding: `20px`,
              borderRadius: `10px`,
              display: `flex`,
              justifyContent: `space-between`,
              marginBottom: `10px`,
              color: `white`,
              fontSize: `24px`,
              fontWeight: `bold`,
              gap: `20px`
            }}
          >
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>
            <div style={{ display: `flex`, gap: `20px`, borderRadius: `10px` }}>
              <button
                onClick={() => onComplete(task.id)}
                style={{
                  padding: `10px`,
                  borderRadius: `10px`,
                  cursor: `pointer`,
                  background: `blue`,
                  color: `white`,
                  fontWeight: `bold`,
                }}
              >
                Complete
              </button>
              <button
                onClick={() => onDelete(task.id)}
                style={{
                  padding: `10px`,
                  borderRadius: `10px`,
                  cursor: `pointer`,
                  background: `blue`,
                  color: `white`,
                  fontWeight: `bold`,
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
