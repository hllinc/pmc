import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../sys/models/user';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit, OnDestroy {

  ws: WebSocket;//定义websocket
  message = [];
  sendMessage: any;
  currentUser: User;

  constructor(private authService: AuthService) {
    this.currentUser = authService.getUser();
  }

  ngOnInit() {
    this.connectWs();
  }

  ngOnDestroy() {
    if (this.ws != null) {
      this.ws.close();
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
    this.ws = new WebSocket('ws://localhost:8080/auth/websocket/' + this.currentUser.id);
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
