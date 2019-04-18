import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../sys/models/user';
import {LoginService} from './login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: User = new User();

  rememberMe = true;

  validateForm: FormGroup;

  constructor(public router: Router,
              public loginService: LoginService,
              private fb: FormBuilder,
              private modalService: NzModalService,
              private dataService: DataService) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rememberMe: [null]
    });
    if (localStorage.getItem('auth_login_username')) {
      this.rememberMe = true;
      this.user.username = localStorage.getItem('auth_login_username');
      this.user.password = localStorage.getItem('auth_login_password');
    }
  }

  checkChange() {
    if (!this.rememberMe) {
      localStorage.removeItem('auth_login_username');
      localStorage.removeItem('auth_login_password');
    }
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  loginEvent() {
    this.user = this.validateForm.value;
    this.loginService.login(this.user).subscribe(data => {
      if (data['access_token']) {
        if (this.rememberMe) {
          localStorage.setItem('auth_login_username', this.user.username);
          localStorage.setItem('auth_login_password', this.user.password);
        }
        this.dataService.setToken(data.access_token);
        this.router.navigateByUrl('frame');
      } else {
        this.modalService.warning({
          nzTitle: '系统提示',
          nzContent: data.error,
          nzOkText: '确定'
        });
      }
    });
  }
}
