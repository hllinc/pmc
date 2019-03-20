import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from './user.service';
import {Page} from '../../models/page';
import {SubSystem} from '../models/sub-system';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet: User[] = [];
  loading = true;
  sortValue = null;
  sortKey = null;
  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];
  searchGenderList: string[] = [];

  sort(sort: { key: string, value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }

  constructor(private userService: UserService) {
  }
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    const page: Page = new Page(this.pageIndex, this.pageSize);
    this.userService.getUsersByPage(page).subscribe((data: any) => {
      this.loading = false;
      // this.total = 200;
      this.dataSet = data.result;
    });
  }

  updateFilter(value: string[]): void {
    this.searchGenderList = value;
    this.searchData(true);
  }

  ngOnInit() {
    this.searchData();
  }

}
