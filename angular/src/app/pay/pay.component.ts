import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';


// goi store
import { Store, createAction } from '@ngrx/store'
import { createCart, updateCart, deleteCart } from '../store/action_Cart'
import { Observable, map } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {
  list: Observable<[]>;

  constructor(
    private service: AppService,
    private store: Store<{ cart: [] }>
  ) {
    this.list = this.store.select('cart')
  }
  cartList: any;
  cartTotal = 0;

  paymentMethod: any;
  deliveryMethod: any;

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
        }
      })

    this.service.getPaymentMethod().subscribe((kq: any) => {
      this.paymentMethod = kq['data']
    })

    this.service.getDeliveryMethod().subscribe((kq: any) => {
      this.deliveryMethod = kq['data']
    })


  }




  finishOrder(fullname: any, email: any, phone: any, address: any, note: any) {

    const data = {
      fullname: fullname.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
      note: note.value
    }

    let id =''

    // them du lieu vao DB => tao khach hang { id customer}
      
    this.service.postCustomer(data).subscribe((kq: any) => {

      id = kq['data']
      // console.log(kq);


    })

    

  }







}
