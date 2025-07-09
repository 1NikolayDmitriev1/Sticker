import { render, screen, fireEvent } from "@testing-library/react";
import Sticker from "../components/Sticker";
import type { StickerProps } from "../components/Sticker";
import { vi } from "vitest";

const mockSetStickers = vi.fn();

const baseSticker: StickerProps = {
  id: "1",
  x: 100,
  y: 100,
  title: "Test Title",
  text: "Test Text",
};

describe("Sticker", () => {
  beforeEach(() => {
    mockSetStickers.mockClear();
  });

  it("displays title and text", () => {
    render(<Sticker {...baseSticker} setStickers={mockSetStickers} />);
    expect(screen.getByDisplayValue("Test Title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Text")).toBeInTheDocument();
  });

  it("calls setStickers when deleting", () => {
    render(<Sticker {...baseSticker} setStickers={mockSetStickers} />);
    const deleteBtns = screen.getAllByLabelText(/delete/i);
    const deleteBtn = deleteBtns.find((el) => el.tagName === "BUTTON");
    fireEvent.click(deleteBtn!);
    expect(mockSetStickers).toHaveBeenCalled();
  });

  it("calls setStickers when editing the title", () => {
    render(<Sticker {...baseSticker} setStickers={mockSetStickers} />);
    const titleInput = screen.getByDisplayValue("Test Title");
    fireEvent.change(titleInput, { target: { value: "New Title" } });
    expect(mockSetStickers).toHaveBeenCalled();
  });
});
