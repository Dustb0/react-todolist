import { useContext, useState } from "react";
import { ListContext } from "../App";
import { TaskListActions } from "../reducers/TaskListReducer";

export default function NewTask() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const taskContext = useContext(ListContext);

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      console.log("keypress ENTER");
      taskContext.dispatch({
        type: TaskListActions.NewTask,
        title: newTaskTitle
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
