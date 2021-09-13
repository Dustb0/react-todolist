import { useContext, useEffect, useState } from "react";
import { ListContext, TaskListActions } from "../App";
import Task from "./Task";

export default function TaskList() {
  const TaskFilterOptions = {
    All: 0,
    Done: 1,
    Undone: 2,
  };

  const taskContext = useContext(ListContext);
  const [taskFilter, setTaskFilter] = useState(TaskFilterOptions.All);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    // Update filtered list
    onFilterChange(taskFilter);
  }, [taskContext]);

  function onToggleDone(task) {
    taskContext.dispatch({ type: TaskListActions.ToggleDone, task: task });
  }

  function onDelete(task) {
    taskContext.dispatch({ type: TaskListActions.DeleteTask, task: task });
  }

  function onEditTask(task, newTitle) {
    taskContext.dispatch({
      type: TaskListActions.EditTask,
      task: task,
      newTitle: newTitle,
    });
  }

  function onFilterChange(filterValue) {
    setTaskFilter(filterValue);

    switch (filterValue) {
      case TaskFilterOptions.Done:
        setFilteredList(taskContext.state.filter((t) => t.completed));
        break;

      case TaskFilterOptions.Undone:
        setFilteredList(taskContext.state.filter((t) => !t.completed));
        break;

      default:
        setFilteredList([...taskContext.state]);
        break;
    }
  }

  console.log("render");

  return (
    <>
      <select
        value={taskFilter}
        onChange={(event) => onFilterChange(Number(event.target.value))}
      >
        <option value={TaskFilterOptions.All}>All</option>
        <option value={TaskFilterOptions.Done}>Done</option>
        <option value={TaskFilterOptions.Undone}>Undone</option>
      </select>
      {filteredList &&
        filteredList.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggleDone={onToggleDone}
            onDeleteTask={onDelete}
            onEditTask={onEditTask}
          />
        ))}
    </>
  );
}
