import { useEffect, useState } from 'react';
import './App.scss';

function App() {

  const [taskList, setTaskList] = useState([])

  // Effect for the initial load of the tasks 
  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch("http://localhost:3001/todos", {
          method: "GET",
        });

        const tasks = await response.json();
        setTaskList(tasks);
      } catch (ex) {
        console.error(ex);
      }
    }
    loadTasks();
  }, []);

  return (
    <div className="app">
      <div className="app__container">
        {taskList && (
            <p>Tasks: {taskList.length}</p>
        )}
      </div>
    </div>    
  );
}

export default App;
