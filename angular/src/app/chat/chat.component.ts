
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  constructor(
    private socket: Socket,
    private elementRef: ElementRef
  ) { }
  @ViewChild('chatpopup') myForm!: ElementRef;
  @ViewChild('chatbox') chatbox!: ElementRef;







  ngOnInit() {
    this.getMessage().subscribe((kq) => {
      console.log(kq);

    })


  }
  // show(){
  //   (<HTMLStyleElement>document
  //     .getElementById('myForm')).style.display = ''

  // }

  show() {
    const nativeEle = this.myForm.nativeElement;
    nativeEle.style.display = 'block'
  }
  close() {
    const closeChat = this.myForm.nativeElement;
    closeChat.style.display = 'none'
  }
  closeBox(){
    const clBox = this.chatbox.nativeElement;
    clBox.style.display = 'none'
  }

  sendMessage(msg: any) {
    this.socket.emit('message', msg.value);
    console.log(msg.value);


  }
  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data) => data));
  }


}
