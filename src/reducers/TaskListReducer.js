import TodoService from "../TodoService";

export const TaskListActions = {
  LoadTasks: Symbol(),
  NewTask: Symbol(),
  DeleteTask: Symbol(),
  EditTask: Symbol(),
  ToggleDone: Symbol()
};

export default function taskListReducer(state, action) {
  switch (action.type) {
    case TaskListActions.LoadTasks:
      return action.tasks;

    case TaskListActions.NewTask:
      const newTask = {
        id: state.length,
        title: action.title,
        completed: false
      };

      // Persist the new task
      TodoService.addTask(newTask);

      // Update the state
      return [...state, newTask];

    case TaskListActions.DeleteTask:
      fetch("http://localhost:3001/todos/" + action.task.id, {
        method: "DELETE"
      });

      return state.filter((t) => t !== action.task);

    case TaskListActions.EditTask:
      const modifiedTask = { ...action.task, title: action.newTitle };
      TodoService.updateTask(modifiedTask);

      return state.map((task) => {
        if (task === action.task) {
          return modifiedTask;
        }

        return task;
      });

    case TaskListActions.ToggleDone:
      const toggledTask = {
        ...action.task,
        completed: !action.task.completed
      };
      TodoService.updateTask(toggledTask);

      return state.map((task) => {
        if (task === action.task) {
          return toggledTask;
        }

        return task;
      });

    default:
      throw new Error(
        "Unknown action for taskListReducer: " + action.type.toString()
      );
  }
}
