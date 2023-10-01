import { ActionTypes, CartItemType, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart(item) {
        const products = get().products;
        const productInState = products.find(
          (product) =>
            product.id === item.id && product.optionTitle === item.optionTitle
        );

        if (productInState) {
          // Update the existing product in the cart
          const updatedProducts = products.map((product) =>
            product.id === productInState.id &&
            product.optionTitle === productInState.optionTitle
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                  price: item.price + product.price,
                }
              : product
          );
          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          // Add a new product to the cart
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        }
      },
      removeFromCart(item) {
        const products = get().products;
        // find product need to remove
        const indexProductRemove: CartItemType | any = products.findIndex(
          (product) =>
            product.id === item.id && product.optionTitle === item.optionTitle
        );

        const productsAfterRemoved = products
          .slice(0, indexProductRemove)
          .concat(products.slice(indexProductRemove + 1, products.length));

        set((state) => ({
          products: productsAfterRemoved,
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - item.price,
        }));
      },
    }),
    { name: "cart", skipHydration: true }
  )
);
