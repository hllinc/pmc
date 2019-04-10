import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from './user.service';
import {SubSystem} from '../models/sub-system';
import {Org} from '../models/org';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {UserFormComponent} from './user-form/user-form.component';
import {PageInfoResponse} from '../../models/page-info-response';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  subSystem: SubSystem;
  org: Org;
  pageIndex = 1;
  pageSize = 20;
  total = 1;
  startRow = 1;
  dataSet: User[] = [];
  loading = false;
  sortValue = null;
  sortKey = null;
  filterGender = [
    {text: 'male', value: 'male'},
    {text: 'female', value: 'female'}
  ];
  searchGenderList: string[] = [];

  sort(sort: { key: string, value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.loadUserTable();
  }

  constructor(private userService: UserService, private modalService: NzModalService, private messageService: NzMessageService) {
  }

  /**
   * 子系统切换事件
   * @param subSystem
   */
  orgChangeSubSystemEvent(subSystem: SubSystem) {
    this.subSystem = subSystem;
    this.org = null;
    this.loadUserTable(true);
  }

  /**
   * 加载用户列表
   * @param reset
   */
  loadUserTable(reset: boolean = false): void {
    this.loading = true;
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.userService.getUsersByPage(this.pageIndex, this.pageSize, this.subSystem.id,
      this.org ? this.org.id : 0).subscribe((data: PageInfoResponse) => {
      this.loading = false;
      this.total = data.total;
      this.dataSet = data.list;
      this.startRow = data.startRow;
    });
  }

  orgChangeEvent(org: Org) {
    this.org = org;
    this.loadUserTable(true);
  }

  /**
   * 添加用户
   */
  addUser() {
    const u = new User();
    u.subSystemId = this.subSystem.id;
    const modal = this.modalService.create({
      nzTitle: '添加用户',
      nzContent: UserFormComponent,
      nzMaskClosable: false,
      nzComponentParams: {
        user: u
      },
      nzFooter: [{
        label: '取消',
        onClick: (componentInstance) => {
          modal.close();
        }
      }, {
        label: '添加',
        type: 'primary',
        onClick: (componentInstance) => {
          const newUser = componentInstance.getFormValue();
          if (newUser) {
            newUser.subSystemId = this.subSystem.id;
            this.userService.addUser(newUser).subscribe(data => {
              modal.close();
              this.messageService.create('success', '添加成功');
              this.loadUserTable();
            });
          }
        }
      }]
    });
  }

  /**
   * 修改用户
   * @param user
   */
  modifyUser(user: User) {
    const modal = this.modalService.create({
      nzTitle: '编辑用户',
      nzContent: UserFormComponent,
      nzMaskClosable: false,
      nzComponentParams: {
        user: user
      },
      nzFooter: [{
        label: '取消',
        onClick: (componentInstance) => {
          modal.close();
        }
      }, {
        label: '保存',
        type: 'primary',
        onClick: (componentInstance) => {
          const newUser = componentInstance.getFormValue();
          if (newUser) {
            this.userService.modifyUser(newUser).subscribe(data => {
              modal.close();
              this.messageService.create('success', '修改成功');
              this.loadUserTable();
            });
          }
        }
      }]
    });
  }

  /**
   * 删除用户
   * @param id
   */
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      // this.modalService.success({
      //   nzTitle: '提示',
      //   nzContent: '删除成功'
      // });
      this.loadUserTable();
    });
  }

  ngOnInit() {
  }

}
