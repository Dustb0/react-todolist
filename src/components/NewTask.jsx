import { useContext, useState } from "react";
import { ListContext, TaskListActions } from "../App";

export default function NewTask() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const taskContext = useContext(ListContext);

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      taskContext.dispatch({
        type: TaskListActions.NewTask,
        title: newTaskTitle,
      });

      setNewTaskTitle("");
    }
  }

  return (
    <div className="control">
      <input
        type="text"
        placeholder="Add your todo..."
        value={newTaskTitle}
        onChange={(event) => setNewTaskTitle(event.target.value)}
        onKeyPress={(event) => handleKeyPress(event)}
      />
    </div>
  );
}
