import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from '../types/index';

interface IProductItem {
    id: number;
    name: string;
    quantity: number,
    new_price: number;
    image: string;
    totalPrice: number
}

interface IProductItemWithQuantity extends IProductItem {
    quantityAdded: number
}

interface CartState {
    cartItems: IProductItem[],
    totalQuantity: number,
    totalAmount: number,
}

const initialState: CartState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCartWithQuantity: (state, action: PayloadAction<IProductItemWithQuantity>) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.id === action.payload.id
            );

            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    name: newItem.name,
                    new_price: newItem.new_price,
                    image: newItem.image,
                    quantity: action.payload.quantityAdded,
                    totalPrice: newItem.new_price * action.payload.quantityAdded,
                });
            } else {
                existingItem.quantity = action.payload.quantityAdded;
                existingItem.totalPrice =
                    Number(existingItem.quantity) * Number(existingItem.new_price);
            }
            state.totalQuantity = state.cartItems.reduce((total, item) => {
                return total + item.quantity;
            }, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => {
                return total + item.totalPrice;
            }, 0);
        },

        addItemToCart: (state, action: PayloadAction<IProductItem>) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.id === action.payload.id
            );

            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    name: newItem.name,
                    new_price: newItem.new_price,
                    image: newItem.image,
                    quantity: 1,
                    totalPrice: newItem.new_price,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice =
                    Number(existingItem.quantity) * Number(existingItem.new_price);
            }
            state.totalQuantity = state.cartItems.reduce((total, item) => {
                return total + item.quantity;
            }, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => {
                return total + item.totalPrice;
            }, 0);
        },

        removeItemToCart: (state, action: PayloadAction<IProductItem>) => {
            const existingItem = state.cartItems.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                // delete item in cart if quantity = 1
                if (existingItem.quantity === 1) {
                    state.cartItems = state.cartItems.filter(
                        (item) => item.id !== action.payload.id
                    );
                } else if (existingItem.quantity === 0) return;
                else {
                    existingItem.quantity--;
                    existingItem.totalPrice =
                        Number(existingItem.quantity) * Number(existingItem.new_price);
                }
            }
            state.totalQuantity = state.cartItems.reduce((total, item) => {
                return total + item.quantity;
            }, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => {
                return total + item.totalPrice;
            }, 0);
        },

        deleteItemToCart: (state, action: PayloadAction<IProductItem>) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload.id
            );
            state.totalQuantity = state.cartItems.reduce((total, item) => {
                return total + item.quantity;
            }, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => {
                return total + item.totalPrice;
            }, 0);
        }
    }
})

export const { addItemToCart, deleteItemToCart, removeItemToCart, addItemToCartWithQuantity } = cartSlice.actions
export default cartSlice.reducer
