"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  selected,
  label,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded border-2 p-2 flex flex-col items-center transition cursor-pointer
      ${selected ? "border-slate-500" : "border-slate-200"}
      `}
    >
      <Icon size={20} />
      <div className="font-medium">{label}</div>
    </div>
  );
};

export default CategoryInput;
