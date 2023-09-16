import { Component, Input } from '@angular/core';

//goi 2 thu vien ActivatedRoute, ParamMap  de lay params
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ComponentVisibilityService } from '../showhide.service';

//goi service
import { AppService, Product } from '../app.service';
// goi store
import { Store, createAction } from '@ngrx/store'

import { createCart } from '../store/action_Cart'
import { Cart } from '../model/cart'
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  products: Array<Product> = []
  hashQuery: Boolean = false;

  list!: Observable<[]>;

  // img = ['ima1.jpg','ima2.png'].map((n)=>`/assets/images/${n}`)


  constructor(
    private componentVisibilityService: ComponentVisibilityService,
    private router: ActivatedRoute,
    private service: AppService,

    private store: Store<{ cart: [] }>
  ) {
    this.list = this.store.select('cart')

  }


  // SU DUNG HAM DE AN DI COMPONENT
  navigateToContactComponent() {
    // Ẩn ComponentA
    this.componentVisibilityService.hideComponent();
  }



// LAY DU LIEU CHO DATA CART
  getDataCart() {
    return this.list.pipe(map((data: any) => data))
  }

  id: any;
  listProduct: any;
  count = 0;



  ngOnInit() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    }
    )


    this.getDataCart().subscribe((kq) => {
      this.count = kq.length
    })




  }
  getData() {

    this.service.getProduct().subscribe((kq: any) => {
      this.listProduct = kq['data']
      console.log(kq);

    })
  }

  @Input() colorRed: any;
  search(s: any) {
    alert(s.value + '/' + this.colorRed)
  }

  senData(event:any){
    let query:string = event.target.value;
    let mathSpcae: any = query.match(/\s*/);
    if (mathSpcae[0] === query) {
      this.products = [];
      this.hashQuery = false;
      return
      
    }

    this.service.searchProduct(query.trim()).subscribe((kq:any)=>{
      this.products = kq
      this.hashQuery = true

      
    })
    

  }

}
