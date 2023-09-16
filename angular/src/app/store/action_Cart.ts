import { createAction } from '@ngrx/store';
import { Cart } from '../model/cart';

export const createCart = createAction(
    '[Cart] CreaterCart',
    (cart: Cart) => ({cart}));
export const updateCart = createAction(
    '[Cart] UpdateCart',
    (cart: Cart) => ({cart}));
export const deleteCart = createAction(
    '[Cart] DeleteCart',
(cartID: String) => ({cartID}));