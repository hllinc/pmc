import {Injectable} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {Org} from '../models/org';

@Injectable()
export class OrgService {

  constructor(private dataService: DataService) {
  }

  /**
   * 获取根节点
   * @returns {Observable<any>}
   */
  getOrgDataBySubSystemId(id: number): Observable<any> {
    return this.dataService.get('/sys/org/getBySubSystemId/' + id);
  }

  /**
   * 根据父id获取组织列表
   * @param {number} pid
   * @returns {Observable<any>}
   */
  getOrgsByParentId(pid: any): Observable<any> {
    return this.dataService.get('/sys/org/getChildrenById/' + pid);
  }

  /**
   * 根据子系统id获取组织树所有层级数据
   * @param subSystemId
   */
  getOrgTreeBySubSystemId(subSystemId: number): Observable<any> {
    return this.dataService.get('/sys/org/getTreeBySubSystemId/' + subSystemId);
  }

  /**
   * 添加组织
   * @param {Org} org
   * @returns {Observable<any>}
   */
  addOrg(org: Org): Observable<any> {
    return this.dataService.post('/sys/org/add', org);
  }

  /**
   * 更新组织
   * @param {Org} org
   * @returns {Observable<any>}
   */
  updateOrg(org: Org): Observable<any> {
    return this.dataService.post('/sys/org/update', org);
  }

  /**
   * 根据id删除组织
   * @param {number} id
   * @returns {Observable<any>}
   */
  deleteById(id: number): Observable<any> {
    // to-do: 级联删除
    return this.dataService.delete('/sys/org/delete/' + id);
  }

}
