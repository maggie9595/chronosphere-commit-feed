import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("renders homepage with search functionality", () => {
  const { container } = render(<Home />);
  expect(screen.getByText("Search")).toBeInTheDocument();
  expect(container.getElementsByClassName("MuiTextField-root").length).toBe(2);
  expect(container.querySelector("button")).toBeInTheDocument();
});
