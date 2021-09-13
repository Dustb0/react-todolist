import React, { useReducer, useEffect } from "react";
import "./App.scss";

import TaskList from "./components/TaskList";
import NewTask from "./components/NewTask";
import TaskProgress from "./components/TaskProgress";

export const ListContext = React.createContext();

export const TaskListActions = {
  LoadTasks: Symbol(),
  NewTask: Symbol(),
  DeleteTask: Symbol(),
  EditTask: Symbol(),
  ToggleDone: Symbol(),
};

function taskListReducer(state, action) {
  switch (action.type) {
    case TaskListActions.LoadTasks:
      return action.tasks;

    case TaskListActions.NewTask:
      return [
        ...state,
        {
          id: state.length,
          title: action.title,
          completed: false,
        },
      ];

    case TaskListActions.DeleteTask:
      return state.filter((t) => t !== action.task);

    case TaskListActions.EditTask:
      return state.map((task) => {
        if (task === action.task) {
          return { ...task, title: action.newTitle };
        }

        return task;
      });

    case TaskListActions.ToggleDone:
      return state.map((task) => {
        if (task === action.task) {
          return { ...task, completed: !task.completed };
        }

        return task;
      });

    default:
      throw new Error(
        "Unknown action for taskListReducer: " + action.type.toString()
      );
  }
}

function App() {
  const [taskListState, dispatchTaskList] = useReducer(taskListReducer, []);

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch("http://localhost:3001/todos", {
          method: "GET",
        });

        const tasks = await response.json();
        dispatchTaskList({ type: TaskListActions.LoadTasks, tasks: tasks });
      } catch (ex) {
        console.log(ex);
      }
    }
    loadTasks();
  }, []);

  return (
    <div className="app">
      <div className="app__container">
        {taskListState && (
          <ListContext.Provider
            value={{ state: taskListState, dispatch: dispatchTaskList }}
          >
            <TaskProgress />
            <TaskList />
            <NewTask />
          </ListContext.Provider>
        )}
      </div>
    </div>
  );
}

export default App;
