import Image from "next/image";

export const QuantityModal = ({ modal }) => {
  return (
    <div className={modal?.quantityModal?.open ? `modal-open` : `modal-closed`}>
      <p className={`mb-2 px-2 font-sans text-base`}>
        Enter your desired quantity:
      </p>
      <div className={`flex flex-col items-center gap-2 px-2`}>
        <input
          value={modal?.quantityModal?.quantity}
          min={1}
          placeholder={`Enter your search term...`}
          type={`text`}
          onChange={({ target: { value } }) => {
            modal?.setQuantityModal({
              ...modal?.quantityModal,
              quantity: +value,
            });
          }}
          className={`w-full rounded-md border border-slate-300 font-sans text-base hover:border-black focus:border-black focus:outline-0 focus:ring-1 focus:ring-black`}
        />
        <button
          onClick={() => {
            if (modal?.quantityModal?.quantity > 0) {
              modal?.handleAddToCart();
              modal?.setQuantityModal({
                ...modal?.quantityModal,
                open: false,
              });
            } else {
              modal?.setQuantityModal({
                ...modal?.quantityModal,
                quantity: 1,
              });
            }
          }}
          className={`w-full rounded-md bg-black px-3 py-2.5 font-sans text-white hover:bg-black/80`}
        >
          <span className={`active-selected-white`}>ADD TO BAG</span>
        </button>
      </div>
    </div>
  );
};
