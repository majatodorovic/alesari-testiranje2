"use client";
import Cookie from "@/public/images/cookie.png";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const CookieAlert = () => {
  const [cookiesAllowed, setCookiesAllowed] = useState(true);
  let cookiesExist = false;
  useEffect(() => {
    const isAllowedCookie = Cookies.get("cookiesAllowed");
    if (isAllowedCookie) cookiesExist = true;
    setCookiesAllowed(cookiesExist);
  }, [cookiesAllowed, cookiesExist]);

  return (
    <>
      {!cookiesAllowed && (
        <div className="fixed bottom-0 right-0 z-[1000] w-[40%] rounded-tl-2xl bg-white p-5 !font-sans shadow-2xl max-lg:w-full max-lg:rounded-t-2xl">
          <div className="flex flex-row gap-2">
            <Image
              src={Cookie}
              alt="Cookie"
              width={40}
              height={40}
              className="self-start object-contain"
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-[12px] font-medium">
                This website uses cookies
              </h2>
              <p className="font-sans text-[10px]">
                We use cookies to make this website work properly and to further
                improve the website to enhance your user experience, personalize
                content and ads, enable social media features and analyze
                traffic. By continuing to use our website, you accept the use of
                cookies.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-between border border-[#f0f0f0] p-2">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex flex-row flex-wrap gap-2">
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="cookie"
                    id="obavezni"
                    defaultChecked={true}
                    className="h-3 w-3 rounded text-green-500"
                  />
                  <label htmlFor="cookie" className="text-[11px]">
                    Mandatory
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="cookie"
                    id="Trajni"
                    defaultChecked={true}
                    className="h-3 w-3 rounded text-green-500"
                  />
                  <label htmlFor="cookie" className="text-[11px]">
                    Permanent
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="cookie"
                    id="Statistika"
                    defaultChecked={true}
                    className="h-3 w-3 rounded text-green-500"
                  />
                  <label htmlFor="cookie" className="text-[11px]">
                    Statistics
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="cookie"
                    id="Marketing"
                    defaultChecked={true}
                    className="h-3 w-3 rounded text-green-500"
                  />
                  <label htmlFor="cookie" className="text-[11px]">
                    Marketing
                  </label>
                </div>
              </div>
              <button
                className="bg-black px-2 py-0.5 font-sans text-xs text-white hover:bg-opacity-80 max-sm:hidden"
                onClick={() => {
                  Cookies.set("cookiesAllowed", true, { expires: 365 });
                  setCookiesAllowed(true);
                }}
              >
                I Agree
              </button>
            </div>
          </div>
          <button
            className="mt-2 w-full bg-black px-2 py-0.5 font-sans text-xs text-white hover:bg-opacity-80 sm:hidden"
            onClick={() => {
              Cookies.set("cookiesAllowed", true, { expires: 365 });
              setCookiesAllowed(true);
            }}
          >
            I Agree
          </button>
        </div>
      )}
    </>
  );
};
