import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppGuard  {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // cho vo su dung duoc Guard cofn false laf nguoc lai

      // muon lay gia tri token de kiem tra nguoi do dang nhap chua
      let token = localStorage.getItem('token');
     
      return (token != null) ?  true: false;
     



      
    
  }
  
}
