import { Component } from '@angular/core';
//goi 2 thu vien ActivatedRoute, ParamMap  de lay params
import { ActivatedRoute, ParamMap } from '@angular/router';


//goi service
import { AppService } from '../app.service';


// goi store
import { Store, createAction } from '@ngrx/store'

import { createCart } from '../store/action_Cart'
import { Cart } from '../model/cart'
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css',

  ]
})
export class ProductComponent {
 
  list!: Observable<[]>;

  constructor
    (
      private router: ActivatedRoute,
      private service: AppService,
      private store: Store<{cart:[]}>
    ) { }


  id: any;
  getDetail = {name:'',price:'',avatar:'',content:''}
  relative: any;
  breadcrumb = { id: '', name: '' };
  fatherOne = { id: '', name: '' }
  isFatherOne: any;
  searchText:any;


  getDataCart(){
    return this.list.pipe(map((data:any)=>data))
  }
  ngOnInit() {
    this.router
      .paramMap
      .subscribe((params: ParamMap) => {
        this.id = params.get('id')
        this.service
          .getDetail(this.id)
          .subscribe((kq: any) => {

            //getDetail Product // chi tiet san pham
            // {name, price, avatar, content}
            this.getDetail = {
              name: kq['data'].name,
              price: kq['data'].price != 0 ?
                kq['data'].price.toLocaleString('en-us', { minimumFractionDigits: 0 })
                : 'Liên hệ',
              content: kq['data'].content,
              avatar: kq['data'].avatar

            
            };
  
            // this.getDataCart().subscribe((kq:any)=>{
              
            // })

            //getRelative // san pham lien quan
            //get categoryId and productId
            // this.service
            //   .getRelative(kq['data'].parentsID, this.id)
            //   .subscribe((kq: any) => {
            //     this.relative = kq['data']
            //   })



          }
          )

      })






  }
  addToCart(getDetail: any) {
    getDetail.price = parseFloat(getDetail.price.replace(/,/g, ''));

    const cart = new Cart(this.id, getDetail.name, getDetail.price,getDetail.quantity = 1, getDetail.avatar)
    //day du lieu vao store
    this.store
      .dispatch(createCart(cart))

    console.log(cart)
    
    alert('Đã thêm vào giỏ hàng')
  }
 
}
