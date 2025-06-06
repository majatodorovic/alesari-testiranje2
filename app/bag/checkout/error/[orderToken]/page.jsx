import Link from "next/link";
import { get } from "@/_api/api";
import { notFound } from "next/navigation";

const userOrderToken = async (orderToken) => {
  return await get(`/checkout/info/${orderToken}`).then(
    (response) => response?.payload,
  );
};
const OrderError = async ({ params: { orderToken } }) => {
  const order = await userOrderToken(orderToken);
  if (order) {
    return (
      <div className="mx-auto mt-[1rem] flex items-center justify-center px-[3%] text-sm 4xl:container lg:mt-[6rem]">
        <div className="my-10 flex flex-col items-center justify-center bg-[#f7f7f7] px-10 py-10 md:px-[15rem]">
          <h1 className="mb-12 text-center text-[1.3rem] font-semibold text-[#fc626b]">
            Purchase failed
          </h1>
          <p className="mb-3 text-center">
            Unfortunately, there was an error processing your order. Yours the
            payment was not made.
          </p>
          <p className="mb-6 text-center">
            Please try again or contact us if the problem i still exists.
          </p>

          <div className="mt-6 flex flex-col gap-4 md:flex-row">
            <Link
              href="/"
              className="mr-2 w-fit border border-black bg-black px-[1.875rem] py-[0.65rem] font-sans text-[1.365rem] uppercase text-white transition-all duration-500 hover:border-black hover:bg-white hover:text-black max-md:text-[1rem]"
            >
              Return to homepage
            </Link>
            <Link
              href="/kontakt"
              className="ml-2 w-fit border !border-black  !bg-transparent bg-black px-[1.875rem] py-[0.65rem] font-sans text-[1.365rem] uppercase text-black transition-all duration-500 hover:border-black hover:bg-black  hover:text-black max-md:text-[1rem] "
            >
              Contact support
            </Link>
          </div>
        </div>
      </div>
    );
  } else return notFound();
};

export default OrderError;
