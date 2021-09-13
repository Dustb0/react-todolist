import { useState } from "react";
import Checkbox from "./Checkbox";
import "./Task.scss";

export default function Task({ task, onToggleDone, onDeleteTask, onEditTask }) {
  const [editMode, setEditMode] = useState(false);
  const [editTaskTitle, setEditTaskTitle] = useState("");

  function openEditMode() {
    setEditTaskTitle(task.title);
    setEditMode(true);
  }

  function saveTask(event) {
    event.preventDefault();
    onEditTask(task, editTaskTitle);
    setEditTaskTitle("");
    setEditMode(false);
  }

  return (
    <div className="control task-detail">
      {editMode ? (
        <form onSubmit={saveTask} className="task-detail__editForm">
          <input
            type="text"
            value={editTaskTitle}
            onChange={(event) => setEditTaskTitle(event.target.value)}
            autoFocus
          />
          <div className="task-detail__actions">
            <input type="submit" value="Save" />
          </div>
        </form>
      ) : (
        <>
          <Checkbox
            label={task.title}
            checked={task.completed}
            onCheckedChanged={() => onToggleDone(task)}
          />
          <div className="task-detail__actions">
            <button onClick={() => openEditMode()}>Edit</button>
            <button onClick={() => onDeleteTask(task)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
