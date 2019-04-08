import {Injectable} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {Page} from '../../models/page';

@Injectable()
export class UserService {

  constructor(private dataService: DataService) {
  }

  /**
   * 分页查询用户
   * @param {Page} page
   * @returns {Observable<any>}
   */
  getUsersByPage(page: Page): Observable<any> {
    return this.dataService.get('/sys/user/selectPage?number=' + page.number + '&size=' + page.size);
  }

}
