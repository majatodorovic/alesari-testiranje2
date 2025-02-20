"use client";
import Image from "next/image";
import {
  handlePaymentType,
  handlePaymentStatus,
  handlePaymentText,
} from "./functions";
import { Button } from "@/_components/shared/ui/button";

export const OrderPaymentInfo = ({ order }) => {
  const { payments } = order;

  const payment_type = handlePaymentType(payments);
  const payment_status = handlePaymentStatus(payments, payment_type);

  const {
    image,
    subtitle,
    payment_info,
    text_line_1,
    text_line_2,
    title,
    button,
  } = handlePaymentText(
    payment_type,
    payment_status?.[payment_type]?.["status_info"],
    payment_status?.[payment_type]?.["fields"],
  );

  return (
    <div className="col-span-2 flex flex-col items-center gap-4 rounded-md bg-[#f0f0f080] md:col-span-1 lg:p-[3.5rem]">
      {image && (
        <Image
          src={image}
          width={200}
          height={100}
          alt={`${process.env.NAME}`}
        />
      )}

      <div className="flex flex-col items-center gap-4">
        {title && (
          <h3 className="text-center text-2xl font-semibold">{title}</h3>
        )}
        {subtitle && (
          <p className="text-center font-sans text-base font-semibold">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex flex-col items-center gap-4">
        {text_line_1 && (
          <p className="text-center font-sans text-base font-semibold">
            {text_line_1}
          </p>
        )}
      </div>
      {payment_info && (
        <div className="flex flex-col items-center">
          {payment_info?.title && (
            <h3
              className={`text-center font-sans text-lg font-semibold ${
                payment_info?.status === "success"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {payment_info?.title}
            </h3>
          )}
          {payment_info?.description && (
            <p className="mt-3 text-center font-sans text-base font-semibold">
              {payment_info?.description}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        {text_line_2 && (
          <p
            className="text-center font-sans text-base font-semibold"
            dangerouslySetInnerHTML={{ __html: text_line_2 }}
          ></p>
        )}
      </div>

      {payment_info?.fields && (
        <div
          className={`flex flex-col items-center font-sans text-base font-semibold`}
        >
          {payment_info?.fields_title && (
            <h4 className="mt-3 text-center font-sans text-base font-semibold">
              {payment_info?.fields_title}
            </h4>
          )}
          {(payment_info?.fields ?? [])?.map(({ label, value }) => {
            if (label !== "Bank") {
              return (
                <div
                  className={`flex items-center gap-2`}
                  key={`${label}-${value}`}
                >
                  <p className={`font-sans text-base font-semibold`}>
                    {label}:
                  </p>
                  <p className={`font-sans text-base font-semibold`}>{value}</p>
                </div>
              );
            }
          })}
        </div>
      )}

      {button && (
        <a href="/" className={`mb-5`}>
          <Button className="mt-10 text-base font-semibold">{button}</Button>
        </a>
      )}
    </div>
  );
};
