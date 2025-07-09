import { nanoid } from "nanoid";
import type { StickerProps } from "./Sticker";

const STICKER_START_X = -270;
const STICKER_START_Y = 170;
const STICKER_Y_OFFSET = 30;

export type AddStickerButtonProps = {
  setItem: React.Dispatch<React.SetStateAction<StickerProps[]>>;
};

const AddStickerButton: React.FC<AddStickerButtonProps> = ({ setItem }) => {
  return (
    <button
      className="px-4 py-2 bg-yellow-200 hover:shadow-yellow-800 rounded shadow-sm z-10 w-40 duration-300 cursor-pointer"
      onClick={() => {
        setItem((prev) => [
          ...prev,
          {
            id: `sticker-${nanoid()}`,
            x: STICKER_START_X,
            y: STICKER_START_Y + prev.length * STICKER_Y_OFFSET,
            title: "",
            text: "",
            locked: true,
          },
        ]);
      }}
    >
      Add Sticker
    </button>
  );
};

export default AddStickerButton;
