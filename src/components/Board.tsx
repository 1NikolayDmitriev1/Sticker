import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const images = import.meta.glob("../assets/boards/*.jpg", {
  eager: true,
  import: "default",
});
const BG_IMAGES = Object.values(images) as string[];

const STORAGE_KEY = "boardBgIndex";

export default function Board() {
  const getInitialIndex = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const idx = saved ? parseInt(saved, 10) : 0;
    return !isNaN(idx) ? idx : 0;
  };
  const [selectedIndex, setSelectedIndex] = useState(getInitialIndex);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  useEffect(() => {
    if (BG_IMAGES.length === 0) return;
    if (selectedIndex >= BG_IMAGES.length) {
      setSelectedIndex(0);
      localStorage.setItem(STORAGE_KEY, "0");
      return;
    }
    localStorage.setItem(STORAGE_KEY, String(selectedIndex));
  }, [selectedIndex]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(selectedIndex);
    }
  }, [emblaApi, selectedIndex]);

  const handlePrev = useCallback(() => {
    setSelectedIndex(
      (prev) => (prev - 1 + BG_IMAGES.length) % BG_IMAGES.length
    );
  }, []);
  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % BG_IMAGES.length);
  }, []);

  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat absolute"
      style={{ backgroundImage: `url(${BG_IMAGES[selectedIndex]})` }}
    >
      <div className="absolute left-1/2 -translate-x-1/2 top-4 z-30 flex items-center gap-4">
        <button
          onClick={handlePrev}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/70 hover:bg-white/90 shadow text-2xl"
          aria-label="Previous background"
        >
          ◀
        </button>
        <div
          ref={emblaRef}
          className="w-32 h-16 overflow-hidden rounded shadow border bg-white/60 flex items-center justify-center"
        >
          <div className="flex">
            {BG_IMAGES.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Background ${idx + 1}`}
                className={`w-32 h-16 object-cover mx-1 rounded ${
                  selectedIndex === idx
                    ? "ring-2 ring-yellow-400"
                    : "opacity-60"
                }`}
                draggable={false}
              />
            ))}
          </div>
        </div>
        <button
          onClick={handleNext}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/70 hover:bg-white/90 shadow text-2xl"
          aria-label="Next background"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
