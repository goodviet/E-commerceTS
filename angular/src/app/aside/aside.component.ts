import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { ComponentVisibilityService } from '../showhide.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  constructor(
    private service: AppService,
    private componentVisibilityService: ComponentVisibilityService,
    private router: Router

  ) { }
  listCategory:any;
  ngOnInit() {
    //lay danh sach danh muc
    this.service.getListParentsCategory()
      .subscribe((kq:any) => {
        // console.log(kq);
        this.listCategory = kq['data'];
        // console.log(this.listCategory)
      })
      
      

  }
  navigateToCategoryComponent() {
    // Ẩn ComponentA
    this.componentVisibilityService.hideComponent();
    // Chuyển đến ComponentB
    // this.router.navigate(['/category']);
  }




}