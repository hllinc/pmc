import {Component} from '@angular/core';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent {

  ws: WebSocket;//定义websocket
  message = [];
  sendMessage: any;

  constructor() {
  }

  ngOnInit() {
    if (!this.ws) {
      this.connectWs();
    }
  }

  sendMessageTo() {
    this.ws.send(this.sendMessage);
  }

  //socket连接
  connectWs() {
    if (this.ws != null) {
      this.ws.close();
    }
    ;
    this.ws = new WebSocket('ws://localhost:8080/auth/websocket/1');
    this.ws.onopen = (event) => {
      //socket 开启后执行，可以向后端传递信息
      console.log('WebSocket connected!');

    };
    this.ws.onmessage = (event) => {
      //socket 获取后端传递到前端的信息
      this.message.push(event.data);
      // console.log(event.data);
    };
    this.ws.onerror = (event) => {
      //socket error信息
      console.log('WebSocket error!');

    };
    this.ws.onclose = (event) => {
      //socket 关闭后执行
      console.log('WebSocket closed!');
    };
  }

}
