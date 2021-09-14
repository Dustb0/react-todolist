import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox from "./Checkbox";

test("should render title", () => {
  render(<Checkbox label="Hello" />);

  const linkElement = screen.getByText("Hello");
  expect(linkElement).toBeInTheDocument();
});

test("should handle unchecked state", () => {
  const { container } = render(<Checkbox label="Hello" checked={false} />);
  expect(container.querySelector("img")).toBeNull();
});

test("should handle unchecked state", () => {
  const { container } = render(<Checkbox label="Hello" checked={true} />);
  expect(container.querySelector("img")).toBeInTheDocument();
});

test("should execute callback", () => {
  const onCheckedChanged = jest.fn();
  const { getByText } = render(
    <Checkbox
      label="Hello"
      checked={true}
      onCheckedChanged={onCheckedChanged}
    />
  );

  fireEvent.click(getByText("Hello"));
  expect(onCheckedChanged).toHaveBeenCalled();
});
