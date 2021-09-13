import { useRef, useState } from "react";
import Checkbox from "./Checkbox";
import "./Task.scss";
import DotImage from "../assets/dots.svg";
import useOnClickOutside from "../hooks/clickOutside";

export default function Task({ task, onToggleDone, onDeleteTask, onEditTask }) {
  const [editMode, setEditMode] = useState(false);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [showActions, setShowActions] = useState(false);

  // Use a reference to the action-menu to close it when the user clicks outside of it
  const actionMenuRef = useRef();
  useOnClickOutside(actionMenuRef, () => setShowActions(false));

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
          <input type="submit" value="Save" />
        </form>
      ) : (
        <>
          <Checkbox
            label={task.title}
            checked={task.completed}
            onCheckedChanged={() => onToggleDone(task)}
          />
          <div
            className="task-detail__action-container"
            onClick={() => setShowActions(!showActions)}
          >
            <img src={DotImage} alt="" />
            {showActions && (
              <div className="task-detail__actions" ref={actionMenuRef}>
                <div
                  className="task-detail__action"
                  onClick={() => openEditMode()}
                >
                  <span>Edit</span>
                </div>
                <div
                  className="task-detail__action"
                  onClick={() => onDeleteTask(task)}
                >
                  <span style={{ color: "#E07C7C" }}>Delete</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
