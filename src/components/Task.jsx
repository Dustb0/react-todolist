import "./Task.scss";

export default function Task({ task }) {

  return (
    <div>
      <input type="checkbox" checked={task.completed} />
      <span>{task.title}</span>
      <div className="task-detail__actions">
            <button>Edit</button>
            <button>Delete</button>
      </div>
    </div>
  );
}
