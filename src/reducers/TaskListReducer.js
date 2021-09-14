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
      return [
        ...state,
        {
          id: state.length,
          title: action.title,
          completed: false
        }
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
