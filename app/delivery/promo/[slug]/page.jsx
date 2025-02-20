import LandingPage from "@/_components/PromoPage/LandingPage";

const PromoPage = async ({ params: { slug } }) => {
  return (
    <>
      <LandingPage slug={slug} />
    </>
  );
};

export default PromoPage;

export const metadata = {
  title: "Promocije | Fashion Template",
  description: "Promocije",
};
