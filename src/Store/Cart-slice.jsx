import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuantity: 0,
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            // To check if the item is already in cart
            const existingItem = state.itemsList.find((item) => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity++;

                existingItem.totalYenAmount = existingItem.yenAmount * existingItem.quantity;

                existingItem.totalDollarAmount = existingItem.dollarAmount * existingItem.quantity;

                existingItem.totalPoundAmount = existingItem.poundAmount * existingItem.quantity;

                state.totalQuantity++;
            } else {
                state.itemsList.push({
                    id: newItem.id,
                    yenCurrency: newItem.yenCurrency,
                    dollarCurrency: newItem.dollarCurrency,
                    poundCurrency: newItem.poundCurrency,

                    yenAmount: newItem.yenAmount,
                    dollarAmount: newItem.dollarAmount,
                    poundAmount: newItem.poundAmount,

                    totalYenAmount: newItem.yenAmount,
                    totalDollarAmount: newItem.dollarAmount,
                    totalPoundAmount: newItem.poundAmount,

                    quantity: 1,
                    // totalPrice: newItem.price,
                    name: newItem.name,
                    brand: newItem.brand,
                    attribute: newItem.attribute,
                    attributeValue: newItem.attributeValue,
                    imageSrc: newItem.image,
                    imageGallery: newItem.imageGallery
                })
                state.totalQuantity++;
            }
        },

        removeFromCart(state, action) {
            const id = action.payload;

            let existingItem = state.itemsList.find(item => item.id === id);
            if (existingItem.quantity === 1) {
                state.itemsList = state.itemsList.filter(item => item.id !== id);
                // existingItem.quantity = 0;
                state.totalQuantity -= existingItem.quantity;

            } else {
                existingItem.quantity--;
                existingItem.totalYenAmount -= existingItem.yenAmount

                existingItem.totalDollarAmount -= existingItem.dollarAmount

                existingItem.totalPoundAmount -= existingItem.poundAmount

                state.totalQuantity--;

            }

        },
    }
});

// export const cartActions = cartSlice.actions;
export const {addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice