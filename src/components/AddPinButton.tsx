import type { PinProps } from "./Pin";
import { nanoid } from "nanoid";

const PIN_START_X = typeof window !== 'undefined' ? window.innerWidth - 450 : 0;
const PIN_START_Y = 150;
const PIN_Y_OFFSET = 30;

export type AddPinButtonProps = {
  setItem: React.Dispatch<React.SetStateAction<PinProps[]>>;
};

const AddPinButton: React.FC<AddPinButtonProps> = ({ setItem }) => {
  return (
    <button
      className="px-4 py-2 bg-red-200 hover:shadow-red-800 rounded shadow-sm z-10 w-40 duration-300 cursor-pointer"
      onClick={() => {
        setItem((prev) => [
          ...prev,
          {
            id: `pin-${nanoid()}`,
            x: PIN_START_X,
            y: PIN_START_Y + prev.length * PIN_Y_OFFSET,
          },
        ]);
      }}
    >
      Add Pin
    </button>
  );
};

export default AddPinButton;
