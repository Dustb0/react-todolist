import { useContext, useMemo } from "react";
import { ListContext } from "../App";
import "./TaskProgress.scss";

export default function TaskProgress() {
  const taskContext = useContext(ListContext);
  const taskProgress = useMemo(
    () =>
      (taskContext.state.filter((t) => t.completed).length /
        taskContext.state.length) *
      100,
    [taskContext.state]
  );

  return (
    <div className="progress-bar">
      <div
        style={{
          height: "100%",
          width: taskProgress + "%",
          backgroundColor: "blue",
        }}
      ></div>
    </div>
  );
}
