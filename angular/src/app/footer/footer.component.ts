import { Component , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Output() callToParent:EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(){
    this.callToParent.emit('Xin chao')
  }

}
