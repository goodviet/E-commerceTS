import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { ComponentVisibilityService } from '../showhide.service';
import { FormGroup, FormControl, Validators} from '@angular/forms'



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(
    // private componentVisibilityService: ComponentVisibilityService,
  ) { }
  // textValue: string = "";

  // navigateToContactComponent () {
  //   // Chuyển đến ComponentB và ẩn ComponentA
  //   this.componentVisibilityService.hideComponent();
  // }


  // tao mot bien contact de chet du lieu tu cac o input


  contact = new FormGroup({
    fullname: new FormControl('', [Validators.minLength(4),  Validators.pattern("[A-Za-z ]+")]),
    email: new FormControl('', [Validators.minLength(4), Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]),
    message: new FormControl('',[Validators.minLength(20)])



  })


 
  get fullname() { return this.contact.controls.fullname }
  get email() { return this.contact.controls.email }
  get message(){return this.contact.controls.message}

  ngOnInit() {

  }

  getDataContact() {
    console.log(this.contact.value)
    alert('Gửi phản hồi thành công')

  }



}
