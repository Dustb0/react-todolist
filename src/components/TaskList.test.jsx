import { render, screen, fireEvent } from "@testing-library/react";
import { ListContext } from "../App";
import TaskList from "./TaskList";

test("should render list", () => {
  const taskList = [
    { id: 1, title: "Test Task", completed: false },
    { id: 2, title: "Test Task #2", completed: false }
  ];

  render(
    <ListContext.Provider value={{ state: taskList, dispatch: () => {} }}>
      <TaskList />
    </ListContext.Provider>
  );

  expect(screen.getByText("Test Task")).toBeInTheDocument();
  expect(screen.getByText("Test Task #2")).toBeInTheDocument();
});

test("should filter list", () => {
  const taskList = [
    { id: 1, title: "Test Task", completed: true },
    { id: 2, title: "Test Task #2", completed: false }
  ];

  render(
    <ListContext.Provider value={{ state: taskList, dispatch: () => {} }}>
      <TaskList />
    </ListContext.Provider>
  );

  // Open filter dropdown & apply filtering
  fireEvent.click(screen.getByText("All"));
  fireEvent.click(screen.getByText("Done"));

  // Second element is not completed, should be filtered out
  expect(screen.getByText("Test Task")).toBeInTheDocument();
  expect(screen.queryByText("Test Task #2")).toBeNull();
});
