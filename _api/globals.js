import { useCartContext } from "./cartContext";
import { post, deleteMethod } from "./api";

export const useGlobalAddToCart = (type = false) => {
  const [, mutateCart] = useCartContext();
  const addToCart = (productId, quantity, fromCart = false) => {
    post("/cart", {
      id_product: productId,
      quantity,
      id_product_parent: null,
      description: null,
      status: null,
      quantity_calc_type: type ? "replace" : "calc",
    })
      .then((response) => {
        mutateCart();
      })
      .catch((error) => console.log(error));
  };

  return addToCart;
};

/**
 * Hook wrapper for global add to bag so context can be used
 */
export const useGlobalRemoveFromCart = () => {
  const [, mutateCart] = useCartContext();

  const removeFromCart = (productId) => {
    post("/cart", {
      id_product: productId,
      quantity: 0,
      id_product_parent: null,
      description: null,
      status: null,
    })
      .then((response) => {
        mutateCart();
      })
      .catch((error) => console.warn(error));
  };

  return removeFromCart;
};

/**
 * Hook wrapper for global add to wishlist so context can be used
 */
export const useGlobalAddToWishList = () => {
  const [, , , mutateWishList] = useCartContext();

  const addToWishList = (productId) => {
    post("/wishlist", {
      id: null,
      id_product: productId,
      quantity: 1,
      id_product_parent: null,
      description: null,
      status: null,
    }).then((response) => {
      mutateWishList();
    });
  };

  return addToWishList;
};

export const useGlobalAddToCompare = () => {
  const [, , , mutateCompare] = useCartContext();

  const addToCompare = (productId) => {
    post("/compare", {
      id: null,
      id_product: productId,
      quantity: 1,
      id_product_parent: null,
      description: null,
      status: null,
    }).then((response) => {
      mutateCompare();
    });
  };

  return addToCompare;
};

/**
 * Hook wrapper for global remove from wishlist so context can be used
 */
export const useGlobalRemoveFromWishlist = () => {
  const [, , , mutateWishList] = useCartContext();

  const removeFromWishList = (id) => {
    deleteMethod(`/wishlist/${id}`)
      .then((response) => {
        mutateWishList();
      })
      .catch((error) => console.warn(error));
  };

  return removeFromWishList;
};
