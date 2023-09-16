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
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  list!: Observable<[]>;

  // img = ['ima1.jpg','ima2.png'].map((n)=>`/assets/images/${n}`)


  constructor(private router: ActivatedRoute,
    private service: AppService,
    private store: Store<{cart:[]}>) {
      this.list= this.store.select('cart')

  }
  id: any;
  name: any;
  breadcrumb = { id: '', name: '' };
  fatherOne = { id: '', name: '' }
  isFatherOne: any;
  listProduct: any;
  img: any;
  p = 0;
  searchText:any;

  getDataCart(){
    return this.list.pipe(map((data:any)=>data))
  }
  ngOnInit() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      // console.log(params.get('slug'));
      this.id = params.get('id');

      // breadcrumb
      this.service
        .getBreadcrumb(this.id)
        .subscribe((kq: any) => {
          this.breadcrumb = {
            id: kq['data']._id,
            name: kq['data'].name
          }

          this.isFatherOne = false

          if (kq['data'].fatherOne != undefined) {
            this.isFatherOne = true

            this.fatherOne = {
              id: kq['data'].fatherOne._id,
              name: kq['data'].fatherOne.name
            }
          }
          // console.log(this.fatherOne)
        })
      //getDetail 
      // this.service.getDetailCategory(this.id).subscribe((kq: any) => {
      //   console.log(kq);
      //   this.name = kq['data'][0].name;
      //   console.log(this.name)

      // })


      //getListProduct
      this.service.getListProduct(this.id).subscribe((kq: any) => {
        this.listProduct = kq['data']
        // console.log(kq);
        
   
        
        

      })

      this.getDataCart().subscribe((kq:any)=>{
        // console.log(kq);
 
        
      })



    })


  }

  addToCart(id: string, name: string, quantity: number, price: number, avatar: string) {
    const cart = new Cart(id, name, quantity,price, avatar)
    

    //day du lieu vao store
    this.store
    .dispatch(createCart(cart))
    // console.log(cart)
    alert('Đã thêm vào giỏ hàng')

  }

}
