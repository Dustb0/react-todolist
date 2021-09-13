import { useContext, useEffect, useState } from "react";
import { ListContext } from "../App";
import "./TaskProgress.scss";

export default function TaskProgress() {
  const taskContext = useContext(ListContext);
  const [finishedCount, setFinishedCount] = useState(0);
  const [finishedPercentage, setFinishedPercentage] = useState(0);

  useEffect(() => {
    const newFinishedCount = taskContext.state.filter(
      (t) => t.completed
    ).length;
    setFinishedCount(newFinishedCount);
    setFinishedPercentage((newFinishedCount / taskContext.state.length) * 100);
  }, [taskContext]);

  return (
    <div className="progress-bar">
      <h1>Progress</h1>
      <div className="progress-bar__container">
        <div
          style={{
            height: "100%",
            width: finishedPercentage + "%",
            backgroundColor: "white",
          }}
        ></div>
      </div>
      <p className="progress-bar__counter">{finishedCount} completed</p>
    </div>
  );
}
