import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "./Dropdown";

const testList = {
  Red: 0,
  Green: 1,
  Blue: 2
};

test("should render value", () => {
  render(<Dropdown list={testList} value={testList.Green} />);

  const linkElement = screen.getByText("Green");
  expect(linkElement).toBeInTheDocument();
});

test("should render dropdown list on click", () => {
  const { getByText } = render(
    <Dropdown list={testList} value={testList.Green} />
  );

  // Retrieve dropbox and click
  fireEvent.click(getByText("Green"));

  expect(screen.getByText("Red")).toBeInTheDocument();
  expect(screen.getByText("Blue")).toBeInTheDocument();
});

test("should execute callback", () => {
  const onSelect = jest.fn();

  const { getByText } = render(
    <Dropdown list={testList} value={testList.Green} onSelect={onSelect} />
  );

  // Open dropbox
  fireEvent.click(getByText("Green"));

  // Select an element
  fireEvent.click(getByText("Blue"));
  expect(onSelect).toHaveBeenCalled();
});
