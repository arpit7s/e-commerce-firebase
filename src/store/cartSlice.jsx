import { createSlice } from "@reduxjs/toolkit";

// Load cart items from local storage
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart
      ? JSON.parse(storedCart)
      : { items: [], totalQuantity: 0, totalAmount: 0 };
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return { items: [], totalQuantity: 0, totalAmount: 0 };
  }
};

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  ...loadCartFromStorage(), // Merge with loaded state
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      if (!state.items) state.items = []; // Ensure items is an array

      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      state.totalQuantity += 1;
      state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);

      localStorage.setItem("cart", JSON.stringify(state)); // Save to local storage
    },

    removeFromCart(state, action) {
      if (!state.items) state.items = []; // Ensure items is an array

      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter((item) => item.id !== id);
        state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);

        localStorage.setItem("cart", JSON.stringify(state)); // Save to local storage
      }
    },

    incrementQuantity(state, action) {
      if (!state.items) state.items = []; // Ensure items is an array

      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;
        state.totalQuantity += 1;
        state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);

        localStorage.setItem("cart", JSON.stringify(state)); // Save to local storage
      }
    },

    decrementQuantity(state, action) {
      if (!state.items) state.items = []; // Ensure items is an array

      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity;
        state.totalQuantity -= 1;
        state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);

        localStorage.setItem("cart", JSON.stringify(state)); // Save to local storage
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
