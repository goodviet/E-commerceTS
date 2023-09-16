import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// goi cac component
import { HomeComponent } from './home/home.component';
import {ProductComponent} from './product/product.component';
import {RegisterComponent} from './register/register.component';
import {PostComponent} from './post/post.component';
import {LoginComponent} from './login/login.component';
import {CategoryComponent} from './category/category.component';
import {ContactComponent} from './contact/contact.component';
import {PageNotPoundComponent} from './page-not-pound/page-not-pound.component'
import {PersionalInfoComponent} from './persional-info/persional-info.component'
import { CartComponent } from './cart/cart.component';
import { PayComponent } from './pay/pay.component';

import { ListCategoryComponent } from './list-category/list-category.component';
import { ParentcategoryComponent } from './parentcategory/parentcategory.component';

// Goi guard 
import {AppGuard} from './app.guard'



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'category/:id',
    component: CategoryComponent
  },
  {
    path: 'listproduct/:id',
    component: ParentcategoryComponent
  },
  {
    path:'listShop',
    component:ListCategoryComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'post',
    component: PostComponent
  },
  {
    path:'persionalInfo',
    component: PersionalInfoComponent,
    canActivate:[AppGuard]
  },
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path: 'cart',
    component:CartComponent
  },
  {
    path:'pay',
    component:PayComponent
  },
  {
    path:'**',
    component:PageNotPoundComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
