"use client";
import { useState } from "react";
import { Layout } from "@/_components/shared/ui/layout";
import Image from "next/image";
import image1 from "../../public/images/sizeguide1.jpg"
import image2 from "../../public/images/sizeguide2.jpg"
import image3 from "../../public/images/sizeguide3.jpg"

export const QAndA = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const faq_data = [
    {
      id: 1,
      question: "What is the story behind Alesari?",
      answer: `Alesari shoes are crafted from the finest materials, including natural leather, 24k gold-plated soles, carbon fiber heels, and hand-painted porcelain flowers. Each pair is a testament to unparalleled craftsmanship and attention to detail, ensuring a luxurious and unique product. You can read the whole story on our page <a style="font-weight: bold; " href="the-art-of-alesari">The Art of Alesari</a>.`,
    },
    {
      id: 2,
      question: "What makes Alesari shoes unique?",
      answer: `Alesari is the first in the world to merge materials such as leather, gold, carbon, and porcelain in fashion, specifically in shoes. Additionally, we are the pioneers in creating heels and insoles from carbon fiber, a technique that took us 5 years to master. You can see every part of the shoe on the page <a style="font-weight: bold; " href="the-art-of-alesari">The Art of Alesari</a>.`,
    },
    {
      id: 3,
      question: "What materials are used in Alesari shoes?",
      answer: `Alesari shoes are made from the finest materials, including natural leather, 24k gold-plated soles, carbon fiber heels, and hand-painted porcelain flowers with gilded edges.`,
    },
    {
      id: 4,
      question:
        "Does Alesari engage in mass production?",
      answer: `No, Alesari specializes in creating limited edition, meticulously crafted footwear, ensuring exclusivity and unparalleled quality for our clientele.`,
    },
    {
      id: 5,
      question: "Why are Alesari shoes offered in such limited quantities?",
      answer: `These shoes are extra limited editions, with only 70 pairs available worldwide per model, ensuring exclusivity and rarity.`,
    },
    {
      id: 6,
      question: "How long does it take to receive my order?",
      answer: `Due to the exclusive nature of our products and the high demand, each pair of Alesari shoes has a waiting list of over 6 months. We appreciate your patience and are confident that you will find the wait worthwhile.`,
    },
    {
      id: 7,
      question: "How do I find the right size?",
      answer: `Our shoes are available in a range of standard sizes. Please refer to our <strong>size guide</strong> on the product page to find your perfect fit. If you have specific sizing questions, our customer service team is here to help.`,

    },
    {
      id: 8,
      question: "What is your return and exchange policy?",
      answer: `At Alesari, we do not accept returns, as each pair of shoes is custom-made based on detailed measurements. For any inquiries, our team is available via email to assist you.
Refunds are only issued in cases of payment errors, such as duplicate transactions or incorrect payment amounts. If such an issue occurs, we will process the refund within a maximum of 2 weeks, depending on your location and bank processing times.
Please note that every package is fully insured against damages during shipping, ensuring your order arrives in perfect condition.
Thank you for your understanding and for choosing Alesari for your luxury footwear.`,
    },
    {
      id: 9,
      question: "How is the delivery process handled?",
      answer: `We work with DHL for delivery services. We do not provide a "Track an Order" section because the customer receives an email for every part of the purchase process. From the start of production, to packaging, to shipping, you will be notified of every step via email. `,
    },
    {
      id: 10,
      question: "Who pays for shipping and customs?",
      answer: `We cover the shipping costs for all orders. However, please note that customers are responsible for any customs fees or duties that may apply to their order.`,
    },
    {
      id: 11,
      question: "Do you offer customization?",
      answer: `Yes, we offer customization for certain models. For more information, please visit our <a style="font-weight: bold; " href="/made-for-you">Made for You page</a> to find all the details. `,
    },
    {
      id: 12,
      question: "Where can I purchase Alesari shoes?",
      answer: `Alesari shoes can be purchased exclusively through our <a style="font-weight: bold; " href="/high-heels">online shop</a>. This ensures that you receive an authentic product and benefit from our direct customer support.`,
    },
    {
      id: 13,
      question: " Are the colors of the shoes exactly as they appear in the photos?",
      answer: `While we strive to showcase our products in the best possible way, slight variations in color may occur due to differences in lighting and screen settings. We are committed to providing accurate representations of our designs and minimizing any discrepancies.`,
    },
    {
      id: 14,
      question: "How do I care for my Alesari shoes?",
      answer: `To maintain the pristine condition of your Alesari shoes, we recommend storing them in a cool, dry place and using a soft cloth to clean them. Avoid exposure to extreme heat, moisture, and direct sunlight. For the porcelain flower and gold-plated elements, handle with care to avoid damage. You can read more about this on the page<a style="font-weight: bold;" href="/customer-care"> Customer Care</a>.`,
    },
    {
      id: 15,
      question: "What if the golden soles get scratched by walking?",
      answer: `Of course, the soles will experience wear, but who cares? <span style="">You have to know that you are among the very few people who walk on gold</span>.`,
    },
    {
      id: 16,
      question: "What if my shoes need repair or maintenance?",
      answer: `If your shoes require repair or maintenance, please contact our customer service team for assistance. More information can be found on our <a style="font-weight: bold; " href="/customer-care">Customer Care</a> page.`,
    },
    {
      id: 17,
      question: "How can I contact customer service?",
      answer: `You can reach our customer service team via email at <a style="font-weight: bold;  href="mailto:info@alesari.com">info@alesari.com</a>`,
    },
  ];

  return (
    <Layout className={`mt-5 lg:mt-20`}>
      <h1 className={`active-selected font-sans text-2xl font-bold uppercase`}>
        Frequently Asked Questions
      </h1>
      <div className={`mt-10 font-sans`}>
        {faq_data?.map(({ id, question, answer }, index) => {
          return (
            <div key={id} className="relative px-2 py-2 odd:bg-secondary">
              <div className="mb-0">
                <button
                  className="rounded-t-1 text-dark-500 group relative flex w-full cursor-pointer items-center justify-between p-3 text-left font-semibold transition-all ease-in"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={openAccordion === index}
                  aria-controls={`collapse-${index}`}
                >
                  <h3 className={`font-sans text-[1.2rem] font-normal`}>{question}</h3>
                  <i
                    className={`fa pt-1 text-base transition-transform fa-chevron-${
                      openAccordion === index ? "up" : "down"
                    }`}
                  ></i>
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openAccordion === index ? "h-auto" : "h-0"
                }`}
              >
                <div className="p-4 font-sans text-lg leading-normal">
                  <p dangerouslySetInnerHTML={{ __html: answer }}></p>
                  {id === 7 ? (
                    <div className="grid grid-cols-3 gap-5 md:gap-[3rem] mt-[2rem]">
                      <div className="max-md:col-span-3 col-span-1">
                        <Image src={image1} width={500} height={300} alt="" />
                        </div>
                        <div className="max-md:col-span-3 col-span-1">
                        <Image src={image2} width={500} height={300} alt="" />
                        </div>
                        <div className="max-md:col-span-3 col-span-1">
                        <Image src={image3} width={500} height={300} alt="" />
                        </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};
