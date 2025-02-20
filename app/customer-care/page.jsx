import { Layout } from "@/_components/shared/ui/layout";
import data from "./customer-care.json";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/_components/shared/ui/button";

const CustomerCare = () => {
  return (
    <Layout className={`mt-5 !font-sans lg:mt-20`}>
      <h1 className={`active-selected text-2xl font-bold uppercase`}>
        Customer Care
      </h1>
      <div className={`mt-10 grid grid-cols-2 gap-10 lg:gap-20`}>
        <div className={`col-span-2 lg:col-span-1`}>
          <p className={`font-sans text-[1.2rem]`}>
            Welcome to the Care & Maintenance Hub of Alesari, where we ensure
            that your cherished shoes remain as exquisite as the day you first
            wore them. We understand that even the most carefully crafted
            treasures may encounter wear and tear over time.
            Here, we offer guidance on how to maintain the beauty of your
            Alesari shoes and provide solutions should they require a touch of
            rejuvenation.
          </p>

          <p className={`mt-10 font-sans text-[1.2rem]`}>
            <strong>Porcelain Flower Restoration</strong>
            <br />
            Should the delicate porcelain flower embellishment on your Alesari
            shoes incur any damage, fret not. Our artisans specialize in
            restoring these intricate adornments to their former glory. Simply
            reach out to us via{" "}
            <Link className={`active-hover`} href={`mailto:info@alesari.com`}>
              email
            </Link>
            , and we'll guide you through the process of replacing the flower,
            ensuring that your shoes continue to radiate their timeless charm.
          </p>
          <p className={`mt-10 font-sans text-[1.2rem]`}>
            <strong>Shoe Maintenance Tips </strong>
            <br />
            To prolong the lifespan of your Alesari shoes, here are a few
            essential maintenance tips:
          </p>
          <ul
            className={`mt-5 list-inside list-disc space-y-3 font-sans text-[1.2rem]`}
          >
            <li>
              Avoid wearing your shoes on rough surfaces to prevent scratches to
              the gold-plated sole. While they are designed for special
              occasions, such as strolling down the red carpet, we understand
              that life is filled with unexpected moments.{" "}
            </li>
            <li>
              Store your shoes in their original packaging or a soft dust bag to
              protect them from dust and scratches when not in use.{" "}
            </li>
            <li>
              Regularly clean your shoes with a soft cloth to remove any dirt or
              residue, ensuring that they maintain their pristine appearance.{" "}
            </li>
            <li>
              For stubborn stains or marks, consult with a professional shoe
              cleaner to ensure safe and effective removal without damaging the
              delicate materials.
            </li>
          </ul>
          <p className={`mt-10 font-sans text-[1.2rem]`}>
            For any further inquiries or assistance, please don't hesitate to
            contact us via{" "}
            <Link className={`active-hover`} href={`mailto:info@alesari.com`}>
              email
            </Link>
            . Our dedicated team is here to ensure that your Alesari experience
            is nothing short of extraordinary, from the moment you slip into
            your shoes to the countless memories they inspire.
          </p>
        </div>
        <div className={`col-span-2 max-lg:row-start-1 lg:col-span-1`}>
          <Image
            src={`/images/cc.webp`}
            alt={`Alesari Customer Care`}
            width={0}
            height={0}
            sizes={`100vw`}
            className={`w-full`}
          />
        </div>
      </div>
      <div className={`flex items-center justify-center`}>
        <Link href={`/contact-us`}>
          <Button className={`!mx-auto !mt-[4rem] !px-12 !text-lg`}>
            Contact us
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default CustomerCare;

export const metadata = {
  title: "Customer Care | Alesari",
};
