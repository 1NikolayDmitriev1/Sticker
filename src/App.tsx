import { useEffect, useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Sticker from "./components/Sticker";
import type { StickerProps } from "./components/Sticker";
import Pin from "./components/Pin";
import type { PinProps } from "./components/Pin";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { dragEndHandler } from "./utils/dragEndHandler";
import Board from "./components/Board";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./utils/localStorageUtils";
import AddPinButton from "./components/AddPinButton";
import AddStickerButton from "./components/AddStickerButton";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [stickers, setStickers] = useState<StickerProps[]>(
    loadFromLocalStorage("stickersData") || []
  );
  const [pins, setPins] = useState<PinProps[]>(
    loadFromLocalStorage("pinsData") || []
  );
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    saveToLocalStorage("stickersData", stickers);
    saveToLocalStorage("pinsData", pins);
  }, [stickers, pins]);

  return (
    <div className="w-full h-screen flex">
      <Board />
      <DndContext
        sensors={sensors}
        modifiers={[restrictToWindowEdges]}
        onDragEnd={(event) => dragEndHandler(event, pins, setStickers, setPins)}
      >
        <Sidebar<StickerProps>
          title={"Sticker"}
          setItem={setStickers}
          Button={AddStickerButton}
          clearItems={() => setStickers([])}
          clearLabel="Clear Stickers"
          clearColor="yellow"
        />
        <div className="flex-1 relative flex justify-center items-center ">
          {stickers.map((sticker) => (
            <Sticker key={sticker.id} {...sticker} setStickers={setStickers} />
          ))}

          {pins.map((pin) => (
            <Pin key={pin.id} {...pin} />
          ))}
        </div>
        <Sidebar<PinProps>
          title={"Pin"}
          setItem={setPins}
          Button={AddPinButton}
          clearItems={() => setPins([])}
          clearLabel="Clear Pins"
          clearColor="red"
        />
      </DndContext>
    </div>
  );
}
