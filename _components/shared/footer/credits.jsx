import { Layout } from "@/_components/shared/ui/layout";
import Image from "next/image";
import Link from "next/link";

export const Credits = () => {
  return (
    <Layout>
      <div
        className={`flex flex-col items-center justify-between py-3 sm:flex-row`}
      >
        <p className={`font-sans text-base text-white max-sm:text-center`}>
          © {new Date().getFullYear()} Alesari.com | All rights reserved.
          Powered by Croonus Technologies
        </p>
        <div
          className={`flex flex-col items-center gap-2 max-sm:mt-2 sm:flex-row`}
        >
          <div className={`flex items-center gap-1 bg-white px-3 py-1`}>
            <Link
              href={"http://www.mastercard.com/rs/consumer/credit-cards.html"}
              target={`_blank`}
              rel={"noopenere noreferrer nofollow"}
            >
              <Image
                src={`/payments/master.png`}
                alt={`Alesari`}
                width={60}
                height={20}
              />
            </Link>
            <Link
              target={`_blank`}
              href={`https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html`}
              rel={"noopenere noreferrer nofollow"}
            >
              <Image
                src={`/payments/visa.webp`}
                alt={`Alesari`}
                width={50}
                height={20}
              />
            </Link>
            <Link
              href={"https://www.bancaintesa.rs"}
              target={`_blank`}
              rel={"noopenere noreferrer nofollow"}
            >
              <Image
                src={`/payments/bancaIntesa.webp`}
                alt={`Alesari`}
                width={130}
                height={20}
              />
            </Link>
            <Image
              src={`/payments/img1.webp`}
              alt={`Alesari`}
              width={35}
              height={20}
            />
            <Image
              src={`/payments/img.webp`}
              alt={`Alesari`}
              width={35}
              height={20}
            />
            <Image
              src={`/payments/img3.webp`}
              alt={`Alesari`}
              width={35}
              height={20}
            />
            <Image
              src={`/payments/img4.webp`}
              alt={`Alesari`}
              width={35}
              height={20}
              className={`self-stretch`}
            />
            <Image
              src={`/payments/american.webp`}
              alt={`Alesari`}
              width={35}
              height={20}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
