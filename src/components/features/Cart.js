import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name:"cart",
    initialState:{value: { amount:0, isItemAdded:false}},

    reducers: {
        addToCart:(state, action) => {
            state.value = action.payload
        },
    },
});

export default cartSlice.reducer
