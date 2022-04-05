import { render, screen } from "@testing-library/react";
import DoesNotExist from "./DoesNotExist";

test("renders does not exist page", () => {
  const { container, getByAltText } = render(<DoesNotExist />);
  const img = getByAltText("404 not found cat");
  expect(img).toHaveAttribute("src", "/404.jpg");
  expect(container.querySelector("h3")).toBeInTheDocument();
  expect(screen.getByText("Return to homepage").closest("a")).toHaveAttribute(
    "href",
    "/"
  );
});
