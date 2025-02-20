"use client";

export const Layout = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={`container mx-auto px-2 xl:px-[2rem] 3xl:px-[5rem] ${className}`}
    >
      {children}
    </div>
  );
};
