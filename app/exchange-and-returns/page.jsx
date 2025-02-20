import { Layout } from "@/_components/shared/ui/layout";

const ExchangeReturns = () => {
  return (
    <Layout className={`mt-5 lg:mt-20`}>
      <h1 className={`active-selected font-sans text-2xl font-bold uppercase`}>
        Return Policy
      </h1>
      <p className={`mt-5 font-sans text-[1.1rem]`}>
        At Alesari, we take immense pride in the craftsmanship and individuality
        of each pair of our handcrafted shoes. As such, due to the custom nature
        of our footwear and the extensive waiting list of over 6 months for
        production, we do not accept returns or exchanges.
      </p>
      <p className={`mt-5 font-sans text-[1.1rem]`}>
        We understand the importance of ensuring the perfect fit for our
        customers, which is why we provide a detailed measurement section on our
        website. Additionally, our dedicated customer service team is available
        via email to assist with any questions or concerns you
        may have regarding sizing or customization.
      </p>
      <p className={`mt-5 font-sans text-[1.1rem]`}>
        Please feel free to reach out to us at
        <a href={`mailto:info@alesari.com`}> info@alesari.com</a> with any
        inquiries, and we'll be delighted to assist you in any way we can.
      </p>
      <p className={`mt-5 font-sans text-[1.1rem]`}>
        Thank you for choosing Alesari for your luxury footwear needs.{" "}
      </p>
    </Layout>
  );
};

export default ExchangeReturns;

export const metadata = {
  title: "Exchange & Returns | Alesari",
};
