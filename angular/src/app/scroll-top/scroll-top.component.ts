import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.css']
})
export class ScrollTopComponent {
  showButton = false

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.scrollY > 100; // Hiển thị nút khi cuộn xuống dưới 100px
  }

  scrollToTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }

}
