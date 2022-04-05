import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders MUI toolbar", () => {
  const { container } = render(<App />);
  expect(screen.getByText("GitHub Commit Feed")).toBeInTheDocument();
  expect(container.getElementsByClassName("MuiToolbar-root").length).toBe(1);
});
