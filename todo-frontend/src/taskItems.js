import React from 'react';

function TaskItem({ task }) {
  return (
    <div className="task-card">
      <label className="task-title">
        <input
          type="checkbox"
          checked={task.completed}
          readOnly
          className="checkbox"
        />
        {task.title}
      </label>

      <p className="task-description">
        {task.description}
      </p>

      <div className="task-meta">
        <span className="category-badge">{task.category.categoryname}</span>
        <span className="due-date">
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default TaskItem;