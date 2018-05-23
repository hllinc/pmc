import {Injectable} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {Page} from '../../models/page';

@Injectable()
export class UserService {

  constructor(private dataService: DataService) {
  }

  /**
   * 获取本地mock数据用户
   * @returns {Observable<any>}
   */
  getUsers(): Observable<any> {
    return this.dataService.getData('./mock/user.json', true);
  }

  /**
   * 分页查询用户
   * @param {Page} page
   * @returns {Observable<any>}
   */
  getUsersByPage(page: Page): Observable<any> {
    return this.dataService.getData('/sys/user/findPage?number=' + page.number + '&size=' + page.size);
  }

}
