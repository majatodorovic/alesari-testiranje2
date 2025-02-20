import { WishlistData } from "@/_components/Wishlist/wishlist";
import { Suspense } from "react";

const Wishlist = () => {
  return (
    <Suspense fallback={` `}>
      <WishlistData />
    </Suspense>
  );
};

export default Wishlist;

export const metadata = {
  title: "Wishlist | Alesari",
};
