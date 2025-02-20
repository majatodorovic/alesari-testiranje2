"use client";

export const Button = ({ element_id, children, className, ...props }) => {
  return (
    <button
      className={`w-fit bg-black px-[1.875rem] py-[0.65rem] font-sans max-md:text-[1rem] text-[1.365rem] uppercase text-white ${className} transition-all duration-500 hover:bg-white hover:text-black border border-white hover:border-black `}
      {...props}
    >
      {children}
    </button>
  );
};
