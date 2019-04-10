import {Injectable} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {PageInfoResponse} from '../../models/page-info-response';
import {User} from '../models/user';

@Injectable()
export class UserService {

  constructor(private dataService: DataService) {
  }

  /**
   * 分页查询用户
   * @param {Page} page
   * @returns {Observable<any>}
   */
  getUsersByPage(pageNum: number, pageSize: number, subSystemId: number, orgId: number): Observable<PageInfoResponse> {
    return this.dataService.get('/sys/user/selectPage?pageNum=' + pageNum + '&pageSize=' + pageSize + '&subSystemId='
      + subSystemId + '&orgId=' + orgId);
  }

  /**
   * 根据id获取单个用户详情
   * @param id
   */
  getUserById(id: number): Observable<User> {
    return this.dataService.get('/sys/user/' + id);
  }

  /**
   * 修改用户
   * @param user
   */
  modifyUser(user: User): Observable<any> {
    return this.dataService.post('/sys/user/update', user);
  }

  /**
   * 添加用户
   * @param user
   */
  addUser(user: User) {
    return this.dataService.post('/sys/user/add', user);
  }

  /**
   * 删除用户
   * @param id
   */
  deleteUser(id: number) {
    return this.dataService.delete('/sys/user/delete/' + id);
  }

  /**
   * 重置密码
   * @param id
   */
  resetPassword(id: number) {
    return this.dataService.post('/sys/user/resetPassword/' + id);
  }

}
