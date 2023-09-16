import { createReducer, on } from '@ngrx/store';
import { createCart, updateCart, deleteCart } from './action_Cart'
import { Cart } from '../model/cart';
import { state } from '@angular/animations';

export const initialState: ReadonlyArray<Cart> = [];

export const cartReducer = createReducer(
    initialState,
    on(createCart, (state, { cart }) => [...state, cart]),
    on(updateCart, (state, { cart }) => {
        const carts = state.map((m) => {
            if (m.id === cart.id) {
                return cart;

            }
            return m
        });
        return carts;
    }),
    on(deleteCart,(state,{cartID})=>state.filter((cart)=>cart.id !== cartID))
);