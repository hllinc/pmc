import {Injectable} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private dataService: DataService) {
  }

  /**
   * 获取用户
   * @returns {Observable<any>}
   */
  getUsers(): Observable<any> {
    return this.dataService.getData('./mock/user.json', true);
  }

}
