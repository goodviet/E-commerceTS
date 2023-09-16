import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'


export interface Product {
  _id: string,
  name: string

}

@Injectable({
  providedIn: 'root'
})



export class AppService {

  constructor(private http: HttpClient) { }

  // url = 'http://localhost:3000/api/';
  url = 'https://ecommerce-be-c2lf.onrender.com/api/'
  
  option = {
    headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
  }


  // searchProduct(query:string){
  //   return this.http.get<{payload: string}>(this.url + 'product/searchProduct' ,  {payload:query},{
  //     headers: new HttpHeaders({'Content-Type':'application/json'})
  //   })

  // }

  searchProduct(query: string) {
    return this.http.post<{ payload: Array<Product> }>(this.url + 'product/searchProduct', { payload: query }).pipe(map(data => data.payload))

  }
  //login ket noi voi nodejs de lay data
  postLogin(data: any) {
    let body = new URLSearchParams();

    body.set('email', data.email);
    body.set('password', data.password);

    return this.http.post(this.url + 'user/login/', body, this.option)

  }
  postRegister(data: any) {
    let body = new URLSearchParams();
    body.set('fullname', data.fullname);
    body.set('email', data.email);
    body.set('password', data.password);
    body.set('phone', data.phone);
    body.set('address', data.address);

    return this.http.post(this.url + 'user/register/', body, this.option)



  }

  postCustomer(data: any) {
    let body = new URLSearchParams();
    body.set('fullname', data.fullname);
    body.set('email', data.email);
    body.set('phone', data.phone);
    body.set('address', data.address);
    body.set('note', data.note);

    return this.http.post(this.url + 'customer/add/', body, this.option)
  }
  // san pham lien quan
  getRelative(categoryId: any, productId: any) {
    return this.http.get(this.url + 'product/relative/' + categoryId + '/' + productId)
  }

  // Danh sach san pham
  getListCategory() {
    return this.http.get(this.url + 'category/getList')
  }
  // Lay Parent Category

  getParent() {
    return this.http.get(this.url + 'category/getParent')
  }

  getListParentsCategory() {
    return this.http.get(this.url + 'category/getListParent')
  }

  getDetailCategory(id: any) {
    return this.http.get(this.url + 'category/getDetail/' + id)

  }

  // Phan trang breadcrumb
  getBreadcrumb(id: any) {
    return this.http.get(this.url + 'category/breadcrumb/' + id)
  }


  // Danh sach san pham theo ID tung cai theo cai cha
  getListProduct(id: any) {
    return this.http.get(this.url + 'category/getListProduct/' + id)
  }


  // Danh sach cha cua cac sac pham theo id
  getParentProduct(id:any){
   return this.http.get(this.url + 'category/getParentProduct/' + id)

  }
  //Danh sach tat ca san pham
  getProduct() {
    return this.http.get(this.url + 'product/getList')
  }

  // chi tiet san pham
  getDetail(id: any) {
    return this.http.get(this.url + 'product/getDetail/' + id)
  }

  // get DetailUser
  getDetailUser(token: any) {
    return this.http.get(this.url + 'user/getDetail/' + token)
  }

  getDeliveryMethod() {
    return this.http.get(this.url + 'deliveryMethod/getList')

  }
  getPaymentMethod() {
    return this.http.get(this.url + 'paymentMethod/getList')

  }

}




// lien quan den http 