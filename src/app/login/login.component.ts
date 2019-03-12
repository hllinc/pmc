import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../sys/models/user';
import {LoginService} from './login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd';
import {DataService} from '../services/data.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: User = new User();

  validateForm: FormGroup;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public loginService: LoginService,
              public authService: AuthService,
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
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      if (true) {
        this.validateForm.controls[i].markAsDirty();
      }
    }
  }

  loginEvent() {
    this.user = this.validateForm.value;
    this.loginService.login(this.user).subscribe(data => {
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        this.router.navigateByUrl('frame');
        // this.authService.initCurrentUser().subscribe(data => {
        // });
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
