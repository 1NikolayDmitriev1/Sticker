import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../components/Sidebar";
import { vi } from "vitest";

describe("Sidebar", () => {
  it("displays the title and the clear button", () => {
    render(
      <Sidebar
        title="Sticker"
        setItem={vi.fn()}
        Button={() => <button>Add</button>}
        clearItems={vi.fn()}
        clearLabel="Clear Stickers"
        clearColor="yellow"
      />
    );
    expect(screen.getByText("Sticker")).toBeInTheDocument();
    expect(screen.getByText("Clear Stickers")).toBeInTheDocument();
  });

  it("calls clearItems when the clear button is clicked", () => {
    const clearItems = vi.fn();
    render(
      <Sidebar
        title="Sticker"
        setItem={vi.fn()}
        Button={() => <button>Add</button>}
        clearItems={clearItems}
        clearLabel="Clear Stickers"
        clearColor="yellow"
      />
    );
    fireEvent.click(screen.getByText("Clear Stickers"));
    expect(clearItems).toHaveBeenCalled();
  });
});
