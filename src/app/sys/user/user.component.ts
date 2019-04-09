import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from './user.service';
import {SubSystem} from '../models/sub-system';
import {Org} from '../models/org';

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

  constructor(private userService: UserService) {
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
      this.org ? this.org.id : 0).subscribe((data: any) => {
      this.loading = false;
      this.total = data.total;
      this.dataSet = data.list;
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

  }

  /**
   * 修改用户
   * @param user
   */
  modifyUser(user: User) {

  }

  deleteUser() {

  }

  ngOnInit() {
  }

}
