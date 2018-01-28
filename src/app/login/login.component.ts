import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../sys/models/user';
import {LoginService} from './login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd';

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
              private fb: FormBuilder,
              private modalService: NzModalService) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
  }

  loginEvent() {
    this.loginService.login(this.user).subscribe(data => {
      if (data.code === 'ok') {
        this.router.navigateByUrl('frame');
      } else {
        this.modalService.warning({
          title: '系统提示',
          content: data.info,
          okText: '确定'
        });
      }
    });
  }
}
