"use client";

import { useState } from "react";
import { useProductDescription } from "@/_hooks/ecommerce.hooks";

export const Tabs = ({ data }) => {
  const { name, sku, productVariant, slug } = data;
  //fetchujemo podatke o opisu
  const {
    data: { description },
  } = useProductDescription({ slug });
  const [activeTab, setActiveTab] = useState(1);
  const className = "";

  return (
    <div className="py-4 max-md:px-2 md:mt-[6rem] lg:ml-[10%] lg:w-[40%]">
      <div className="flex flex-col md:flex-row gap-5">
        {description ? (
          <div
            className={`active-hover cursor-pointer font-sans text-[16px] uppercase ${activeTab === 1 ? " active-selected " : ""
              }`}
            onClick={() => setActiveTab(1)}
          >
            Details
          </div>
        ) : null}
        <div
          onClick={() => {
            setActiveTab(2);
          }}
          className={`ease active-hover  cursor-pointer font-sans  text-[16px] uppercase transition-all md:hover:text-[16px] ${activeTab === 2 ? "active-selected" : ""
            }`}
        >
          Box
        </div>
        <div
          onClick={() => {
            setActiveTab(3);
          }}
          className={`ease active-hover  cursor-pointer font-sans  text-[16px] uppercase transition-all md:hover:text-[16px] ${activeTab === 3 ? "active-selected" : ""
            }`}
        >
          Please note
        </div>
        <div
          onClick={() => {
            setActiveTab(4);
          }}
          className={`ease active-hover  cursor-pointer font-sans  text-[16px] uppercase transition-all md:hover:text-[16px] ${activeTab === 4 ? "active-selected" : ""
            }`}
        >
          Shipping and returns
        </div>
        <div
          onClick={() => {
            setActiveTab(5);
          }}
          className={`ease active-hover  cursor-pointer font-sans  text-[16px] uppercase transition-all md:hover:text-[16px] ${activeTab === 5 ? "active-selected" : ""
            }`}
        >
          Refund Policy
        </div>
      </div>
      {activeTab === 1 && (
        <div key={`details`} className="mt-[2rem] font-sans">
          <h4
            className={`${className} mb-[1.4rem] font-sans text-[22px] font-bold`}
          >
            {name}
          </h4>
          <div
            className={`${className} pl-1 font-sans text-[17px] font-light`}
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      )}
      {activeTab === 2 && (
        <div key={`box`} className={`mt-[2rem] font-sans text-justify`}>
          <p className={`font-sans text-[17px] font-light`}>
            Discover the epitome of luxury and care with the Alesari shoe box,
            where every detail is meticulously crafted to elevate your unboxing
            experience. <br />
            <br />
            Unveil your coveted pair of shoes nestled within a wooden box,
            exuding sophistication and timeless elegance. Lined with plush in
            various captivating colors, each box promises a delightful surprise
            as we meticulously select the perfect hue to complement your chosen
            style.
            <br />
            <br /> But our commitment to safeguarding your precious purchase
            goes beyond aesthetics. Encased within the wooden box lies a carbon
            fiber box, also ensconced in plush, designed to facilitate seamless
            transportation during your travels. Crafted from the same material
            as your shoe heels, this carbon fiber box ensures not only
            durability but also a harmonious alignment with the essence of your
            footwear.
            <br />
            <br /> Your shoes are cocooned in layers of plush, ensuring they
            arrive at your doorstep in pristine condition, shielded from any
            potential damage.
            <br />
            <br /> With Alesari, every unboxing is an experience to savor, where
            luxury meets practicality, and anticipation meets delight. Elevate
            your journey with our meticulously crafted shoe box, because your
            footwear deserves nothing less than the extraordinary.{" "}
          </p>
        </div>
      )}
      {activeTab === 3 && (
        <div key={`note`} className="mt-[2rem] text-justify">
          <p className={`font-sans text-[17px] font-light`}>
            We stand committed to showcasing our products in the best possible
            way, ensuring that while there may be slight variations in color due
            to differences in lighting and screen settings, we strive for
            accuracy and consistency to bring you the true essence of our
            designs. Also, each porcelain flower adorning our shoes is
            meticulously handmade and hand-painted, ensuring that every pair is
            uniquely crafted. While we strive for beauty in every detail, slight
            variations may occur, making each piece a one-of-a-kind work of art.
          </p>
        </div>
      )}
      {activeTab === 4 && (
        <div id="shipping">
          <div className="mt-[2rem] font-sans text-justify">
            <p className={`mt-5 font-sans text-[1.1rem]`}>
              At Alesari, we take immense pride in the craftsmanship and individuality
              of each pair of our handcrafted shoes. As such, due to the custom nature
              of our footwear and the extensive waiting list of over 6 months for production,
              we do not accept returns or exchanges.
            </p>
            <p className={`mt-5 font-sans text-[1.1rem]`}>
              We understand the importance of ensuring the perfect fit for our customers,
              which is why we provide a detailed measurement section on our website.
              Additionally, our dedicated customer service team is available via email
              to assist with any questions or concerns you may have regarding
              sizing or customization.
            </p>
            <p className={`mt-5 font-sans text-[1.1rem]`}>
              Once your package is ready to be shipped, you will receive an email
              notification prompting you to expect the delivery within the next 7 days,
              depending on your address and shipping preferences. Please note that delivery
              is at our cost.We partner with DHL, a trusted courier service, to ensure that
              your package arrives safely and swiftly to your doorstep, wherever you are in the world.
            </p>
            <p className={`mt-5 font-sans text-[1.1rem]`}>
              Please feel free to reach out to us at <a href={`mailto:info@alesari.com`}> info@alesari.com</a>  with any inquiries,
              and we'll be delighted to assist you in any way we can.
            </p>
            <p className={`mt-5 font-sans text-[1.1rem]`}>
              Thank you for choosing Alesari for your luxury footwear needs.{" "}
            </p>
          </div>
        </div>
      )}
      {activeTab === 5 && (
        <div id="refund">
          <div className="mt-[2rem] font-sans text-justify">
            <p className={`mt-5 font-sans text-[1.1rem]`}>
              At Alesari, we do not accept returns, as each pair of shoes is custom-made based on detailed measurements. For any inquiries, our team is available via email to assist you.
            </p>
            <p className={`mt-5 font-sans text-[1.1rem]`}>
              Refunds are only issued in cases of payment errors, such as duplicate transactions or incorrect payment amounts. If such an issue occurs, we will process the refund within a maximum of 2 weeks, depending on your location and bank processing times.
            </p>
            <p className={`mt-5 font-sans text-[1.1rem]`}>
              Please note that every package is fully insured against damages during shipping, ensuring your order arrives in perfect condition.
            </p>
            <p className={`mt-5 font-sans text-[1.1rem]`}>
              Thank you for your understanding and for choosing Alesari for your luxury footwear.{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
