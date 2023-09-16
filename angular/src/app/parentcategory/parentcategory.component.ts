import { Component } from '@angular/core';


//goi 2 thu vien ActivatedRoute, ParamMap  de lay params
import { ActivatedRoute, ParamMap, Route } from '@angular/router';
//goi service
import { AppService } from '../app.service';

@Component({
  selector: 'app-parentcategory',
  templateUrl: './parentcategory.component.html',
  styleUrls: ['./parentcategory.component.css']
})
export class ParentcategoryComponent {
  constructor(
    private service: AppService,
    private router: ActivatedRoute
  ) {

  }
  id: any
  listParentPoduct: any;
  listCategory :any;
  ngOnInit() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
      this.service.getParentProduct(this.id).subscribe((kq: any) => {
        this.listParentPoduct = kq['data']
        // console.log(kq);

      })
    })

  }


}
