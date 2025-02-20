"use client";

import { useEffect, useRef } from "react";
import { useNewsletter } from "@/_hooks/ecommerce.hooks";
import { toast } from "react-toastify";

export const Newsletter = () => {
  const inputRef = useRef(null);
  const { mutate: subscribe, isPending, isSuccess } = useNewsletter();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(inputRef.current.value)) {
      subscribe({ email: inputRef.current.value });
    } else {
      toast.warn("Please enter a valid email address", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  // Reset input value when isSuccess changes to true
  useEffect(() => {
    if (isSuccess) {
      inputRef.current.value = "";
    }
  }, [isSuccess]);

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center gap-3 max-md:w-full max-md:flex-col md:flex-row `}
    >
      <p
        className={`active-hover text-left font-sans text-[1.3rem] text-white max-md:hidden`}
      >
        Subscribe to the <br />
        newsletter:
      </p>
      <p
        className={`active-hover mt-6 text-left font-sans text-[1.3rem] text-white md:hidden`}
      >
        Subscribe to the newsletter:
      </p>
      <input
        ref={inputRef}
        type="email"
        placeholder="Email address"
        className={`active-hover border-2 border-[#828282] bg-black font-sans text-[1rem] font-bold text-[#828282] focus:border-[#828282] focus:outline-0 focus:ring-0 max-md:!w-full md:!w-[25rem]`}
      />
      <button
        disabled={isPending}
        className={`right-0.5 bg-[#828282] px-6 py-2 font-sans text-[1rem] font-bold text-white transition-all duration-300 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40 md:absolute`}
        onClick={handleSubmit}
      >
        OK
      </button>
    </form>
  );
};
