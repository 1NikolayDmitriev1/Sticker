import { useDraggable } from "@dnd-kit/core";
import backGroundImage from "../assets/pin.png";

export type PinProps = {
  id: string;
  x: number;
  y: number;
};

const Pin: React.FC<PinProps> = ({ id, x, y }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  const style = {
    position: "absolute" as const,
    left: x + (transform?.x ?? 0),
    top: y + (transform?.y ?? 0),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "pointer" : "grab",
    zIndex: 10,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      tabIndex={0}
      aria-label="Pin"
    >
      <div
        className="bg-cover bg-center bg-no-repeat w-16 h-16 relative"
        style={{ backgroundImage: `url(${backGroundImage})` }}
      >
      </div>
    </div>
  );
};

export default Pin;
