import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  constructor(private socket: Socket) { }

  showChat = false

  ngOnInit() {
    this.getMessage().subscribe((kq) => {
      console.log(kq);

    })
  }
  sendMessage(msg: any) {
    this.socket.emit('message', msg.value);
    console.log(msg.value);
    

  }
  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data) => data));
  }


}
