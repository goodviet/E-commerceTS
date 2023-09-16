import { Component } from '@angular/core';
//goi 2 thu vien ActivatedRoute, ParamMap  de lay params
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ComponentVisibilityService } from '../showhide.service';

//goi service
import { AppService } from '../app.service';

// goi store
import { Store, createAction } from '@ngrx/store'

import { createCart } from '../store/action_Cart'
import { Cart } from '../model/cart'
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-morepd',
  templateUrl: './morepd.component.html',
  styleUrls: ['./morepd.component.css']
})
export class MorepdComponent {
  list!: Observable<[]>;
  // xac dinh trang thai hien thi cua template la => true(hien thi)
  isVisible: boolean = true;

  constructor(
    private router: ActivatedRoute,
    private service: AppService,
    private store: Store<{ cart: [] }>,
    // truyen vao parameter componentVisibilityService vao thong qua DependencyInjection để dung Service
    private componentVisibilityService: ComponentVisibilityService
  ) {
    this.list = this.store.select('cart')
    // 
    this.componentVisibilityService.isVisible$.subscribe((isVisible) => {
      this.isVisible = isVisible;
    });
  }
  listCategory: any;
  listIphone: any;
  listGame: any;
  listScreen: any;
  listSamSung: any;
  listDetail: any;
  listMouse: any;
  id: any;


  navigateToContactComponent() {
    // Ẩn ComponentA
    this.componentVisibilityService.hideComponent();
  
    // Chuyển đến ComponentB
 
    // this.router.navigate(['/register']);
   
  }

  getDataCart() {
    return this.list.pipe(map((data: any) => data))
  }

  ngOnInit() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      //lay danh sach danh muc
      // this.service.getListParentsCategory()
      //   .subscribe((kq: any) => {
      //     // console.log(kq);
      //     this.listCategory = kq['data']




      //   })

      this.service.getParent().subscribe((kq: any) => {
        this.listCategory = kq['data']
      })


      //getListProduct
      this.service.getListProduct(this.id = '64f55464cf8e3f71b6ea00a2').subscribe((kq: any) => {
        this.listIphone = kq['data']

      })

      //du lieu tay cam choi Game

      this.service.getListProduct(this.id = '64795fe9b525e0bf49a8addf').subscribe((kq: any) => {
        this.listGame = kq['data']

      })

      // LAY DU LIEU MAN HINH MAY TINH
      this.service.getListProduct(this.id = '64f553f2cf8e3f71b6ea008c').subscribe((kq: any) => {
        this.listScreen = kq['data']

      })


      //du lieu dien thoai SAMSUNG
      this.service.getListProduct(this.id = '64f5546acf8e3f71b6ea00a4').subscribe((kq: any) => {
        this.listSamSung = kq['data']

      })
      //du lieu Chuot May Tinh
      this.service.getListProduct(this.id = '64f553fbcf8e3f71b6ea008e').subscribe((kq: any) => {
        this.listMouse = kq['data']

      })





    })


  }

  
  addToCart(id: string, name: string, quantity: number, price: number, avatar: string) {
    const cart = new Cart(id, name, quantity, price, avatar)


    //day du lieu vao store
    this.store
      .dispatch(createCart(cart))
    // console.log(cart)
    alert('Đã thêm vào giỏ hàng')

  }

}
