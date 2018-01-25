import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/user';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: User = new User();

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute, public loginService: LoginService) {

  }

  ngOnInit() {

  }

  login() {
    this.loginService.loginForUser(this.user).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('workspace');
    });
  }

  forgetPwd() {

  }
}
