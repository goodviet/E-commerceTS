import { Component } from '@angular/core';
//goi 2 thu vien ActivatedRoute, ParamMap  de lay params
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  // constructor(
  //   private service: AppService,

  // ) { }
  constructor(private router: ActivatedRoute,
    private service: AppService) {

  }

  listCategory: any;
  id: any;
  name: any;
  breadcrumb: any;
  fatherOne: any;
  isFatherOne: any;
  listProduct: any;
  img: any;
  p = 0;
  ngOnInit() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');



      //lay danh sach danh muc
      this.service.getListParentsCategory()
        .subscribe((kq: any) => {
          // console.log(kq);
          this.listCategory = kq['data'];
          // console.log(this.listCategory)
        })


      //getListProduct
      this.service.getListProduct(this.id).subscribe((kq: any) => {
        this.listProduct = kq['data']

      })

    })

  }

}
