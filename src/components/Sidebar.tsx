import React from "react";

export type SidebarProps<T> = {
  title: string;
  setItem: React.Dispatch<React.SetStateAction<T[]>>;
  Button: React.FC<{ setItem: React.Dispatch<React.SetStateAction<T[]>> }>;
  clearItems?: () => void;
  clearLabel?: string;
  clearColor?: "yellow" | "red";
};

const Sidebar = <T,>({
  title,
  setItem,
  Button,
  clearItems,
  clearLabel,
  clearColor = "red",
}: SidebarProps<T>) => {
  const clearBtnClass =
    clearColor === "yellow"
      ? "bg-yellow-100 hover:bg-yellow-200 "
      : "bg-red-100 hover:bg-red-200 ";
  return (
    <div className="w-70 bg-white/60 p-4 shadow-xl z-1 backdrop-blur-sm text-center">
      <h2 className="mb-4 font-bold ">{title}</h2>
      <Button setItem={setItem} />
      {clearItems && clearLabel && (
        <button
          className={`mt-4 px-4 py-2 rounded shadow-sm w-40 duration-300 cursor-pointer ${clearBtnClass}`}
          onClick={clearItems}
        >
          {clearLabel}
        </button>
      )}
    </div>
  );
};

export default Sidebar;
