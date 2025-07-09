import { render, screen, fireEvent } from "@testing-library/react";
import Board from "../components/Board";

describe("Board", () => {
  it("displays the navigation buttons", () => {
    render(<Board />);
    expect(screen.getByLabelText(/previous background/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next background/i)).toBeInTheDocument();
  });

  it("changes the background when you click on next/prev", () => {
    render(<Board />);
    const nextBtn = screen.getByLabelText(/next background/i);
    fireEvent.click(nextBtn);
    const newImages = screen.getAllByRole("img");
    const newSrc = newImages[0].getAttribute("src");
    expect(newSrc).not.toBeUndefined();
  });
});
