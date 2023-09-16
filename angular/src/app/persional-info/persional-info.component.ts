import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { AppService } from '../app.service';

@Component({
  selector: 'app-persional-info',
  templateUrl: './persional-info.component.html',
  styleUrls: ['./persional-info.component.css']
})
export class PersionalInfoComponent {

  constructor(
    private router: Router,
    private service: AppService,) {

  }
  token = localStorage.getItem('token')
  user:any;
  email:any;


  ngOnInit() {
    this.service.getDetailUser(this.token)
    .subscribe((kq: any)=>{
      // console.log(kq)
    this.email = kq['data'].email
  

    })
    const age: number = 25
    console.log(age);
    

  }
  //logout
  logout() {
    localStorage.removeItem('token');
    alert('ban dax dang xuat')
    // chuyen trang
    this.router.navigate(['/login'])





  }

}
