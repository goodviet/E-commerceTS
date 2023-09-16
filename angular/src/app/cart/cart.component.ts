import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


// goi store
import { Store, createAction } from '@ngrx/store'
import { createCart, updateCart, deleteCart } from '../store/action_Cart'
import { Cart } from '../model/cart'
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  list!: Observable<[]>;

  constructor(
    private store: Store<{ cart: [] }>
  ) {
    this.list = this.store.select('cart')
  }




  cartList: any;
  cartTotal = 0;

  getDataCart() {
    return this.list.pipe(map((data: any) => data))
  }
  ngOnInit() {
    this.getDataCart()
      .subscribe((kq: any) => {
        this.cartList = kq
        this.cartTotal = 0;
        for (let index = 0; index < kq.length; index++) {
          this.cartTotal += kq[index]['price'] * kq[index]['quantity']
          // console.log(this.cartList);
          




        }

      })
  }
  updateCart(id: string, name: string, price: number, qty: any, avatar: string) {
    const cart = new Cart(id, name, price, qty.value, avatar)
    // thêm dữ liệu vào store
    this.store.dispatch(updateCart(cart))
    
  }
  deleteCart(id: string){
    this.store.dispatch(deleteCart(id))

    

  }

}