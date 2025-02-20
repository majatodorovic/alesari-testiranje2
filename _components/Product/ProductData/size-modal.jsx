"use client";

import { useState } from "react";

export const SizeModal = ({setSizeModal}) => {
  const [measurementType, setMeasurementType] = useState("cm");

  const sizes = [
    33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40,
    40.5, 41, 41.5, 42,
  ];

  const convertEUtoUS = (size) => {
    return size - 30;
  };

  const convertEUtoUK = (size) => {
    return size - 33;
  };

  return (
    <div
      className={`m-auto max-h-[80%] w-full max-w-[95%] overflow-y-auto bg-white md:max-w-[60%] relative`}
    >
        <div className="text-[26px] absolute top-[1.2rem] right-[2.2rem] cursor-pointer" onClick={() => setSizeModal(false)}>x</div>
      <div className={` p-5 `}>
        <h3 className={`pb-2 text-left font-sans text-[1.5rem] font-bold`}>
          Size Guide
        </h3>
        <p className={`pb-4 font-sans text-[1.2rem]`}>
          Please refer to the following size chart to find your perfect fit.
        </p>
        <table className={`w-full bg-white font-sans shadow-lg max-md:!text-sm`}>
          <colgroup>
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
          </colgroup>
          <thead className={`border-b border-b-black`}>
            <tr className={`divide`}>
              <th className={`bg-[#f5f5f5] py-3 `}>EU</th>
              <th>US</th>
              <th>UK</th>
              <th>Foot Length</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((size) => {
              return (
                <tr key={size} className={`divide-x  divide-y`}>
                  <td className={`bg-[#f2f2f2] py-1.5 text-center font-bold`}>
                    {size}
                  </td>
                  <td className={`py-1.5 text-center`}>
                    {convertEUtoUS(size)}
                  </td>
                  <td className={`py-1.5 text-center`}>
                    {convertEUtoUK(size)}
                  </td>
                  <td className={`py-1.5 text-center`}>
                    {measurementType === "cm"
                      ? (size * 0.67).toFixed(1)
                      : (size * 0.26).toFixed(1)}
                    {measurementType}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={`sticky bottom-0 border-t border-t-gray-500 flex items-center justify-center w-full bg-gray-100 px-5 py-2`}>
        <div className={`flex items-center gap-2`}>
          <span>cm</span>
          <div
            tabIndex={0}
            onClick={() =>
              setMeasurementType(measurementType === "cm" ? "in" : "cm")
            }
            className={`relative w-[60px] cursor-pointer rounded-l-[5rem] rounded-r-[5rem] border border-slate-300 py-3 focus:border-black`}
          >
            <div
              className={
                measurementType === "cm"
                  ? `absolute inset-0 left-0.5 top-0 my-auto h-[20px] w-[20px] rounded-full bg-black transition-all duration-300`
                  : `absolute inset-0 left-[60%] top-0 my-auto h-[20px] w-[20px] rounded-full bg-black transition-all duration-300`
              }
            ></div>
          </div>
          <span>in</span>
        </div>
      </div>
    </div>
  );
};
