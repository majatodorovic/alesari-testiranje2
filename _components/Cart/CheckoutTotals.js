import { currencyFormat } from "@/_helpers/functions";

const CheckoutTotals = ({ className, options, totals, summary, formData }) => {


  return (
    <div className={`flex flex-col md:px-[2rem] py-[0.8rem]`}>
      <div className={`flex items-center justify-between py-3`}>
        <p className={`${className} text-[1.2rem] font-normal`}>
          Total value of the items:
        </p>
        <p className={`${className} text-[1.2rem] font-light`}>
          {currencyFormat(totals?.with_vat)}
        </p>
      </div>
      
      <div
        className={`flex items-center justify-between border-t border-t-[#ececec] py-3`}
      >
        <p className={`${className} text-[1.2rem] font-normal`}>
          Shipping cost amount:
        </p>
        <p className={`${className} text-[1.2rem] font-light`}>
          free shipping
        </p>
      </div>
      <div
        className={`flex items-center justify-between border-t border-t-[#ececec] py-2`}
      >
        <p className={`${className} text-[1.2rem] mt-4 font-semibold`}>
          Total to pay:
        </p>
        <p className={`${className} text-[1.2rem] font-medium`}>
          {currencyFormat(totals?.total)}
        </p>
      </div>
    </div>
  );
};

export default CheckoutTotals;
