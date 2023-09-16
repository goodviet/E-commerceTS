import { Component } from '@angular/core';
import { ComponentVisibilityService } from '../showhide.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private service: AppService

  ) { }
  // user = {
  //   name: "Nguyen Van A",
  //   email: "NguyenvanA@gmail.com",
  //   phone: "0102020422",
  //   address: "Go Vap - Ho Chi Minh "
  // }
  ngOnInit() {

  }
  getDataFormRegister(data: any) {
    this.service.postRegister(data)
      .subscribe((kq: any) => {
        // console.log(kq)
        alert("Đăng ký thành công")
      })


  }

}
