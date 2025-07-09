import { useDraggable } from "@dnd-kit/core";
import backGroundImage from "../assets/post-it.png";

export type StickerProps = {
  id: string;
  x: number;
  y: number;
  title: string;
  text: string;
};

export type StickerEditableProps = StickerProps & {
  setStickers: React.Dispatch<React.SetStateAction<StickerProps[]>>;
};

const Sticker: React.FC<StickerEditableProps> = ({
  id,
  x,
  y,
  title,
  text,
  setStickers,
}) => {
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, title: e.target.value } : s))
    );
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, text: e.target.value } : s))
    );
  };
  const handleDelete = () => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      tabIndex={0}
      aria-label="Sticker"
    >
      <div
        className="w-64 h-64 flex flex-col shadow-lg justify-between bg-cover bg-center p-2 relative"
        style={{ backgroundImage: `url(${backGroundImage})` }}
      >
        <div className="absolute left-0 top-0 w-full h-8 flex items-center justify-between px-2 z-20">
          <div
            {...listeners}
            className="flex-1 h-full flex items-center cursor-grab text-gray-500 hover:text-gray-800"
            aria-label="Drag handle"
            aria-grabbed={isDragging}
            tabIndex={-1}
            style={{ minWidth: 0 }}
          >
            <span className="text-lg select-none" role="img" aria-label="move">
              ⠿
            </span>
          </div>
          <button
            onClick={handleDelete}
            className={`w-7 h-7 text-base flex items-center justify-center bg-white/80 rounded-full border border-gray-300 hover:bg-yellow-200 transition`}
            aria-label={"delete"}
            type="button"
          >
            <span role="img" aria-label="delete">
              ✖️
            </span>
          </button>
        </div>
        <input
          className="w-full bg-transparent font-bold text-lg outline-none placeholder-gray-400 mb-1 mt-10"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title..."
          maxLength={40}
        />
        <textarea
          className="w-full flex-1 bg-transparent resize-none outline-none placeholder-gray-400 text-base"
          value={text}
          onChange={handleTextChange}
          placeholder="Sticker text..."
          maxLength={300}
        />
      </div>
    </div>
  );
};

export default Sticker;
