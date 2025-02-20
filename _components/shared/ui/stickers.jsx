"use client";

export const Stickers = ({
  name,
  className = "bg-primary text-[1.175rem] font-serif",
}) => {
  return (
    <div className={`${className} px-2.5 py-0.5`}>
      <p className={`text-white`}>{name}</p>
    </div>
  );
};
