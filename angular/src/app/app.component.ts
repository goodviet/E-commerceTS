import { Component } from '@angular/core';

declare function greet ():void;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // constructor(){
  //   greet()
  // }
  title = 'angular';
  colors = ['Green','Yellow'];
  colorRed = 'red';
  getData(data:any){
    // console.log(data)
  }

}
