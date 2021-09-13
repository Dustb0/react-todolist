import { useContext } from "react";
import { ListContext } from "../App";
import Task from "./Task";

export default function TaskList() {

  const taskContext = useContext(ListContext);

  return (
    <>
      {taskContext &&
        taskContext.state.map((task) => (
          <Task
            key={task.id}
            task={task}
          />
        ))}
    </>
  );
}
