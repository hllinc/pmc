import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../sys/models/user';
import {LoginService} from './login.service';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: any;
  public user: User = new User();

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute, public loginService: LoginService) {

  }

  ngOnInit() {

  }

  loginEvent() {
    this.loginService.login(this.user).subscribe(data => {
      if (data.code === 'ok') {
        this.message = null;
        this.router.navigateByUrl('workspace');
      } else {
        this.message = data.info;
      }
    });
  }

  forgetPwd() {

  }
}
