import { render, screen } from "@testing-library/react";
import Feed from "./Feed";

test("renders loading commit feed", () => {
  render(<Feed />);
  expect(screen.getByText("Loading")).toBeInTheDocument();
});
