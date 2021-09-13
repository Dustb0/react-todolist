import React, { useEffect, useReducer } from 'react';
import './App.scss';
import TaskList from './components/TaskList';

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

    default:
      throw new Error(
        "Unknown action for taskListReducer: " + action.type.toString()
      );
  }
}

export const ListContext = React.createContext();

function App() {

  const [taskListState, dispatchTaskList] = useReducer(taskListReducer, []);

  // Effect for the initial load of the tasks 
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
            <TaskList />
          </ListContext.Provider>
        )}
      </div>
    </div>    
  );
}

export default App;
