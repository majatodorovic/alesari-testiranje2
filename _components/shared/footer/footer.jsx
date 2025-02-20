"use client";
import { Layout } from "@/_components/shared/ui/layout";
import Link from "next/link";
import { Newsletter } from "@/_components/shared/footer/newsletter";
import Image from "next/image";
import { Credits } from "@/_components/shared/footer/credits";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();
  return (
    <div className={`relative -mt-[10.5rem] bg-[#141414] pt-[13.25rem]`}>
      <Layout
        className={`flex flex-row items-center justify-between max-md:flex-col`}
      >
        <div
          className={`flex flex-col flex-wrap items-center gap-8 max-md:mx-auto max-md:flex-wrap max-md:justify-center max-md:gap-2 md:!mr-auto md:flex-row`}
        >
          <Link
            href={`/exchange-and-returns`}
            className={`active-hover-white font-sans text-[1.2rem] text-white ${pathname === "/exchange-and-returns" && "active-selected-white"}`}
          >
            Exchanges & Returns
          </Link>
          <Link
            href={`/delivery`}
            className={`active-hover-white font-sans text-[1.2rem] text-white ${pathname === "/delivery" && "active-selected-white"}`}
          >
            Delivery
          </Link>
          <Link
            href={`/customer-care`}
            className={`active-hover-white font-sans text-[1.2rem] text-white ${pathname === "/customer-care" && "active-selected-white"}`}
          >
            Customer Care
          </Link>
          <Link
            href={`/faq`}
            className={`active-hover-white font-sans text-[1.2rem] text-white ${pathname === "/faq" && "active-selected-white"}`}
          >
            Q&A
          </Link>
          <Link
            href={`/page-in-construction`}
            className={`active-hover-white font-sans text-[1.2rem] text-white ${pathname === "/payment" && "active-selected-white"}`}
          >
            Payment
          </Link>
          <Link
            href={`/terms-and-conditions`}
            className={`active-hover-white font-sans text-[1.2rem] text-white ${pathname === "/terms-and-conditions" && "active-selected-white"}`}
          >
            Terms & Conditions
          </Link>
          <Link
            href={`/privacy-policy`}
            className={`active-hover-white font-sans text-[1.2rem] text-white ${pathname === "/privacy-policy" && "active-selected-white"}`}
          >
            Privacy Policy
          </Link>
        </div>
        <Newsletter />
      </Layout>
      <Image
        src={`/other/gold-divider.png`}
        alt={`Alesari`}
        width={1920}
        height={10}
        className={`mt-5`}
      />
      <Credits />
    </div>
  );
};
