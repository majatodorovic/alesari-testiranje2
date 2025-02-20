import { Layout } from "@/_components/shared/ui/layout";
import Image from "next/image";
import Link from "next/link";

export const CTAFooter = () => {
  return (
    <Layout className={`mt-[4rem]`}>
      <div
        className={`relative z-[5] flex items-center bg-secondary py-[2.75rem] max-md:flex-col max-md:gap-4 md:flex-row`}
      >
        <Link
          href={`mailto:info@alesari.com`}
          className={`group m-auto flex flex-col items-center justify-center gap-4`}
        >
          <Image
            src={`/icons/mail-gray.png`}
            alt={`Alesari`}
            width={35}
            height={20}
            className={`group-hover:hidden`}
          />
          <Image
            src={`/icons/mail.png`}
            alt={`Alesari`}
            width={35}
            height={20}
            className={`hidden group-hover:block`}
          />
          <p className={`active-hover font-sans text-[1.563rem]`}>CONTACT US</p>
          <Image
            src={`/icons/right-arrow-gray.png`}
            alt={`Alesari`}
            width={35}
            height={20}
            className={`group-hover:hidden`}
          />
          <Image
            src={`/icons/right-arrow.png`}
            alt={`Alesari`}
            width={35}
            height={20}
            className={`hidden group-hover:block`}
          />
        </Link>
        <Link href={`/`} className={`m-auto`}>
          <Image
            src={`/images/CMYK_LOGO_ALESARI_CRNI SIMBOL.png`}
            quality={100}
            alt={`Alesari`}
            width={252}
            height={252}
            className="max-md:w-[140px]"
          />
        </Link>
        <div
          className={`group m-auto flex flex-col items-center justify-center gap-4`}
        >
          <Image
            src={`/icons/rss-gray.png`}
            alt={`Alesari`}
            width={35}
            height={20}
            className={`group-hover:hidden`}
          />
          <Image
            src={`/icons/rss.png`}
            alt={`Alesari`}
            width={35}
            height={20}
            className={`hidden group-hover:block`}
          />
          <p className={`active-hover font-sans text-[1.563rem]`}>FOLLOW US</p>
          <div className={`flex items-center justify-center gap-3`}>
            <Link
              className={`group-hover:hidden`}
              href={`https://www.instagram.com/alesari_official/`}
              target={`_blank`}
            >
              <Image
                src={`/icons/video1-gray.png`}
                alt={`Alesari`}
                width={32}
                height={20}
              />
            </Link>
            <Link
              className={`group-hover:hidden`}
              href={`https://www.tiktok.com/@alesari_official`}
              target={`_blank`}
            >
              <Image
                src={`/icons/tiktok-gray.png`}
                alt={`Alesari`}
                width={40}
                height={20}
              />
            </Link>
            <Link
              className={`group-hover:hidden`}
              href={`https://www.facebook.com/alesariofficial/`}
              target={`_blank`}
            >
              <Image
                src={`/icons/social-media-gray.png`}
                alt={`Alesari`}
                width={35}
                height={20}
              />
            </Link>
            <Link
              className={`group-hover:hidden`}
              href={`https://www.linkedin.com/company/alesari/posts/?feedView=all`}
              target={`_blank`}
            >
              <Image
                src={`/icons/linkedin-gray.png`}
                alt={`Alesari`}
                width={35}
                height={20}
              />
            </Link>
            <Link
              className={`hidden group-hover:block`}
              href={`https://www.instagram.com/alesari_official/`}
              target={`_blank`}
            >
              <Image
                src={`/icons/video1.png`}
                alt={`Alesari`}
                width={32}
                height={20}
              />
            </Link>
            <Link
              className={`hidden group-hover:block`}
              href={`https://www.tiktok.com/@alesari_official`}
              target={`_blank`}
            >
              <Image
                src={`/icons/tiktok.png`}
                alt={`Alesari`}
                width={40}
                height={20}
              />
            </Link>
            <Link
              className={`hidden group-hover:block`}
              href={`https://www.facebook.com/alesariofficial/`}
              target={`_blank`}
            >
              <Image
                src={`/icons/social-media.png`}
                alt={`Alesari`}
                width={35}
                height={20}
              />
            </Link>
            <Link
              className={`hidden group-hover:block`}
              href={`https://www.linkedin.com/company/alesari/posts/?feedView=all`}
              target={`_blank`}
            >
              <Image
                src={`/icons/linkedin.png`}
                alt={`Alesari`}
                width={35}
                height={20}
              />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
