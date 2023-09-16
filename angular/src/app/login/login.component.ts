import { Component } from '@angular/core';
import { AppService } from '../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private service: AppService,
    private router: Router
    ){
    

  }

email : string = ""
password :  string = ""

validateAndAlert() {
  if (this.email.trim() === ''|| this.password.trim() === '') {
    // alert('Vui long dien pass va email.');
    console.log('not ok')
 
  }  
  else if(this.email.trim() !== ''|| this.password.trim() !== '')
  {
    console.log(' ok')

  }
}

token = localStorage.getItem('token')
ngOnInit(){
if(this.token != null){
  this.router.navigate(['/persionalInfo'])


}


}
  getDataFormLogin(data:any){
    this.service
    .postLogin(data)
    .subscribe((kq:any)=>{
      if(kq['data']['token'] !=  undefined){
        localStorage.setItem('token',kq['data']['token'])
        alert('dn ok')
        // chuyen trang
        this.router.navigate(['/persionalInfo'])

  
  

      }
      else{
        // console.log(kq['data']['error'])

      }

    })



  }

} 
