import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { ComponentVisibilityService } from '../showhide.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  // collapsed = true;
  constructor(
    private componentVisibilityService: ComponentVisibilityService,
    private router: Router
    ) {}
    navigateToContactComponent() {
      // Ẩn ComponentA
      this.componentVisibilityService.hideComponent();
    
      // Chuyển đến ComponentB
   
      // this.router.navigate(['/register']);
     
    }


}
