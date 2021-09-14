import taskListReducer, { TaskListActions } from "./TaskListReducer";

test("should add new task", () => {
  const inTasks = [{ id: 1, title: "Test Task", completed: false }];
  const outTasks = taskListReducer(inTasks, {
    type: TaskListActions.NewTask,
    title: "New Task"
  });

  // New Tasks should be added at the end
  expect(outTasks.length).toBe(2);
  expect(outTasks[1].title).toBe("New Task");
});

test("should load tasks", () => {
  const loadedTasks = [
    { id: 1, title: "Test Task", completed: false },
    { id: 2, title: "Test Task #2", completed: false }
  ];
  const outTasks = taskListReducer([], {
    type: TaskListActions.LoadTasks,
    tasks: loadedTasks
  });

  // New Tasks should be added at the end
  expect(outTasks.length).toBe(2);
});

test("should delete task", () => {
  const inTasks = [
    { id: 1, title: "Test Task", completed: false },
    { id: 2, title: "Test Task #2", completed: false }
  ];
  const outTasks = taskListReducer(inTasks, {
    type: TaskListActions.DeleteTask,
    task: inTasks[1]
  });

  // Last task should have been removed
  expect(outTasks.length).toBe(1);
  expect(outTasks[0].id).toBe(1);
});

test("should edit task", () => {
  const inTasks = [
    { id: 1, title: "Test Task", completed: false },
    { id: 2, title: "Test Task #2", completed: false }
  ];
  const outTasks = taskListReducer(inTasks, {
    type: TaskListActions.EditTask,
    task: inTasks[1],
    newTitle: "Interesting Task"
  });

  // Last task should have a new title
  expect(outTasks[1].title).toBe("Interesting Task");
});

test("should toggle task completed state", () => {
  const inTasks = [
    { id: 1, title: "Test Task", completed: false },
    { id: 2, title: "Test Task #2", completed: false }
  ];
  const outTasks = taskListReducer(inTasks, {
    type: TaskListActions.ToggleDone,
    task: inTasks[1]
  });

  expect(outTasks[1].completed).toBeTruthy();
});
