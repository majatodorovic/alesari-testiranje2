import { Layout } from "@/_components/shared/ui/layout";

const Delivery = () => {
  return (
    <Layout className={`mt-5 lg:mt-20`}>
      <h1 className={`active-selected font-sans text-2xl font-bold uppercase`}>
        Delivery
      </h1>
      <p className={`mt-5 font-sans text-[1.1rem]`}>
        At Alesari, we believe that the anticipation of receiving your
        meticulously handcrafted pair of shoes is part of the luxury experience.
        Due to the custom nature of our footwear and the intricate craftsmanship
        involved, there is an approximate waiting list of 6 months from the time
        of order placement to the completion of your package.
      </p>
      <p className={`mt-5 font-sans text-[1.1rem]`}>
        Once your package is ready to be shipped, you will receive an email
        notification prompting you to expect the delivery within the next 7
        days, depending on your address and shipping preferences. Please note
        that delivery is at our cost.
      </p>
      <p className={`mt-5 font-sans text-[1.1rem]`}>
        We partner with DHL, a trusted courier service, to ensure that your
        package arrives safely and swiftly to your doorstep, wherever you are in
        the world.
      </p>
      <p className={`mt-5 font-sans text-[1.1rem]`}>
        Thank you for your patience and for choosing Alesari for your
        luxury footwear needs.
      </p>
    </Layout>
  );
};

export default Delivery;

export const metadata = {
  title: "Delivery | Alesari",
};
