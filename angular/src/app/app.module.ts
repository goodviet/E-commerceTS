import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


// cac component import vao de su dung
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { SectionComponent } from './section/section.component';
import { ArticleComponent } from './article/article.component';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { PostComponent } from './post/post.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotPoundComponent } from './page-not-pound/page-not-pound.component';
import { PersionalInfoComponent } from './persional-info/persional-info.component';
import { ListCategoryComponent } from './list-category/list-category.component';



//http
import { HttpClientModule } from '@angular/common/http';

// pagination
import { NgxPaginationModule } from 'ngx-pagination';


import { CartComponent } from './cart/cart.component';
import { MorepdComponent } from './morepd/morepd.component';
// form xu ly ngoai file HTML

// import { FormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 

// socket io
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'https://socketio-ecommerce.onrender.com', options: {} };

// xu ly file typrscript
import { ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';

// ngrx
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { MyCounterComponent } from './my-counter/my-counter.component';
import {cartReducer} from'./store/reducer_Cart';
import { PayComponent } from './pay/pay.component';
import { CustomFilterPipe } from './custom-filter-pipe.pipe';
import { ParentcategoryComponent } from './parentcategory/parentcategory.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    SectionComponent,
    ArticleComponent,
    AsideComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    PostComponent,
    RegisterComponent,
    LoginComponent,
    CategoryComponent,
    ContactComponent,
    PageNotPoundComponent,
    PersionalInfoComponent,
    CartComponent,
    MorepdComponent,
    ChatComponent,
    MyCounterComponent,
    PayComponent,
    ListCategoryComponent,
    CustomFilterPipe,
    ParentcategoryComponent,
    ScrollTopComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    
    
    // Ng2SearchPipe, 
    // api
    HttpClientModule,
    //ngxpagination
    NgxPaginationModule,

    // form
    FormsModule,
    ReactiveFormsModule,
    //socket io
    SocketIoModule.forRoot(config),
    StoreModule.forRoot({cart: cartReducer , count: counterReducer})


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
