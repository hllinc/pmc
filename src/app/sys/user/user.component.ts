import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {UserService} from './user.service';
import {Page} from '../../models/page';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public users: User[] = [];
  public tableLoading = true;

  page: Page = new Page(1, 10);
  _allChecked = false;
  _indeterminate = false;
  _displayData = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    // this.userService.getUsersByPage(this.page).subscribe(data => {
    //   this.users = data.content;
    //   this.tableLoading = false;
    // });
  }
  _displayDataChange($event) {
    this._displayData = $event;
    this._refreshStatus();
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }

  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => {
        data.checked = true;
      });
    } else {
      this._displayData.forEach(data => {
        data.checked = false;
      });
    }
    this._refreshStatus();
  }

}
