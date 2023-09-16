import { Component } from '@angular/core';

//goi 2 thu vien ActivatedRoute, ParamMap  de lay params
import { ActivatedRoute, ParamMap, Route } from '@angular/router';
//goi service
import { AppService } from '../app.service';
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent {
  constructor(
    private service: AppService,
    private router: ActivatedRoute

  ) {

  }
  id: any
  listCategory: any;

  ngOnInit() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.service.getParent().subscribe((kq: any) => {
        this.listCategory = kq['data']
      })



    })
  }

}
