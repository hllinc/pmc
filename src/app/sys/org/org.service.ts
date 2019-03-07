import {Injectable} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {ServerData} from '../../models/server-data.model';
import {Org} from '../models/org';

@Injectable()
export class OrgService {

  constructor(private dataService: DataService) {
  }

  /**
   * 获取组织树
   * @returns {Observable<any>}
   */
  getOrgData(): Observable<any> {
    return this.dataService.getData('./mock/org.json', true);
  }

  /**
   * 根据父id获取组织列表
   * @param {number} pid
   * @returns {Observable<ServerData>}
   */
  getOrgsByParentId(pid: number): Observable<ServerData> {
    return this.dataService.getData('/sys/org/findByPid?pid=' + pid);
  }

  /**
   * 获取根节点
   * @returns {Observable<ServerData>}
   */
  getOrgDataBySubSystemId(id: number): Observable<ServerData> {
    return this.dataService.getData('/sys/org/getOrgDataBySubSystemId?id=' + id);
  }

  /**
   * 添加组织
   * @param {Org} org
   * @returns {Observable<ServerData>}
   */
  addOrg(org: Org): Observable<ServerData> {
    return this.dataService.postData('/sys/org/add', org);
  }

  /**
   * 更新组织
   * @param {Org} org
   * @returns {Observable<ServerData>}
   */
  updateOrg(org: Org): Observable<ServerData> {
    return this.dataService.postData('/sys/org/update', org);
  }

  /**
   * 根据id删除组织
   * @param {number} id
   * @returns {Observable<ServerData>}
   */
  deleteById(id: number): Observable<ServerData> {
    return this.dataService.getData('/sys/org/deleteById?id=' + id);
  }

  /**
   * 根据编号匹配删除
   * @param {string} no
   * @returns {Observable<ServerData>}
   */
  deleteByNoLike(no: string): Observable<ServerData> {
    return this.dataService.getData('/sys/org/deleteByNoLike?no=' + no);
  }

}
