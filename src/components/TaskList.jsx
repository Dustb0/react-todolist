import { useContext, useEffect, useState } from "react";
import { ListContext } from "../App";
import { TaskListActions } from "../reducers/TaskListReducer";
import Dropdown from "./Dropdown";
import Task from "./Task";
import "./TaskList.scss";

export default function TaskList() {
  const TaskFilterOptions = {
    All: 0,
    Done: 1,
    Undone: 2
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
      newTitle: newTitle
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

  return (
    <div className="task-list">
      <div className="task-list__title-row">
        <h2>Tasks</h2>
        <Dropdown
          list={TaskFilterOptions}
          value={taskFilter}
          onSelect={onFilterChange}
        />
      </div>
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
    </div>
  );
}
