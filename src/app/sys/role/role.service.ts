import {Injectable} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {PageInfoResponse} from '../../models/page-info-response';
import {Role} from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private dataService: DataService) {
  }

  /**
   * 分页获取列表
   * @param pageNum
   * @param pageSize
   * @param subSystemId
   */
  getRolesByPage(pageNum: number, pageSize: number, subSystemId: number): Observable<PageInfoResponse> {
    return this.dataService.get('/sys/role/selectPage?pageNum=' + pageNum + '&pageSize=' + pageSize + '&subSystemId=' + subSystemId);
  }

  /**
   * 根据id查询单个角色
   * @param id
   */
  selectById(id: number): Observable<any> {
    return this.dataService.get('/sys/role/' + id);
  }

  /**
   * 添加角色
   * @param role
   */
  addRole(role: Role): Observable<any> {
    return this.dataService.post('/sys/role/add', role);
  }

  /**
   * 更新角色
   * @param role
   */
  updateRole(role: Role): Observable<any> {
    return this.dataService.post('/sys/role/update', role);
  }

  /**
   * 删除角色
   * @param id
   */
  delete(id: number): Observable<any> {
    return this.dataService.delete('/sys/role/delete/' + id);
  }
}
