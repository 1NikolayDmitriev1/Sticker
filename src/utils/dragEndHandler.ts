import type { DragEndEvent } from "@dnd-kit/core";
import type { StickerProps } from "../components/Sticker";
import type { PinProps } from "../components/Pin";
import { isIntersecting } from "./isIntersecting";
import { PIN_SIZE, STICKER_SIZE } from "../constants";

export const dragEndHandler = (
  event: DragEndEvent,
  pins: PinProps[],
  setStickers: React.Dispatch<React.SetStateAction<StickerProps[]>>,
  setPins: React.Dispatch<React.SetStateAction<PinProps[]>>
) => {
  const { active, delta } = event;
  if (typeof active.id !== "string") return;

  if (active.id.startsWith("sticker-")) {
    setStickers((prev) =>
      prev.map((sticker) => {
        if (sticker.id === active.id) {
          const intersects = pins.some((pin) =>
            isIntersecting(
              {
                x: sticker.x + delta.x,
                y: sticker.y + delta.y,
                width: 200,
                height: 200,
              },
              {
                x: pin.x,
                y: pin.y,
                width: PIN_SIZE,
                height: PIN_SIZE,
              }
            )
          );
          if (intersects) {
            return {
              ...sticker,
              x: sticker.x + delta.x,
              y: sticker.y + delta.y,
            };
          } else {
            return {
              ...sticker,
              x: sticker.x + delta.x,
              y: window.innerHeight - STICKER_SIZE - 15,
            };
          }
        }
        return sticker;
      })
    );
  } else if (active.id.startsWith("pin-")) {
    setPins((prev) =>
      prev.map((pin) =>
        pin.id === active.id
          ? {
              ...pin,
              x: pin.x + delta.x,
              y: pin.y + delta.y,
            }
          : pin
      )
    );
  }
};
