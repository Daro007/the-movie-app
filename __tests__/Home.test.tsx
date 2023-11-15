import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("should have Welcome to the Movie App text", () => {
    render(<Home />);

    const myElem = screen.getByText("Welcome to the Movie App");

    expect(myElem).toBeInTheDocument();
  });
});
