import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const itemExist = state.cartItems.find((i) => i.product === item.product);

      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === itemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    default:
      return state;
  }
};
