import React, { useReducer, useEffect } from "react";
import "./App.scss";

import TaskList from "./components/TaskList";
import NewTask from "./components/NewTask";
import TaskProgress from "./components/TaskProgress";
import taskListReducer, { TaskListActions } from "./reducers/TaskListReducer";

export const ListContext = React.createContext();

function App() {
  const [taskListState, dispatchTaskList] = useReducer(taskListReducer, []);

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch("http://localhost:3001/todos", {
          method: "GET"
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
