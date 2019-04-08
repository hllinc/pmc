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
   * 获取根节点
   * @returns {Observable<ServerData>}
   */
  getOrgDataBySubSystemId(id: number): Observable<ServerData> {
    return this.dataService.get('/sys/org/getOrgDataBySubSystemId?id=' + id);
  }

  /**
   * 根据父id获取组织列表
   * @param {number} pid
   * @returns {Observable<ServerData>}
   */
  getOrgsByParentId(pid: number): Observable<ServerData> {
    return this.dataService.get('/sys/org/getOrgByParentId?parentId=' + pid);
  }

  /**
   * 添加组织
   * @param {Org} org
   * @returns {Observable<ServerData>}
   */
  addOrg(org: Org): Observable<ServerData> {
    return this.dataService.post('/sys/org/add', org);
  }

  /**
   * 更新组织
   * @param {Org} org
   * @returns {Observable<ServerData>}
   */
  updateOrg(org: Org): Observable<ServerData> {
    return this.dataService.post('/sys/org/update', org);
  }

  /**
   * 根据id删除组织
   * @param {number} id
   * @returns {Observable<ServerData>}
   */
  deleteById(id: number): Observable<ServerData> {
    return this.dataService.get('/sys/org/delete?id=' + id);
  }

  /**
   * 根据编号匹配删除
   * @param {string} no
   * @returns {Observable<ServerData>}
   */
  deleteByNoLike(no: string): Observable<ServerData> {
    return this.dataService.get('/sys/org/deleteByNoLike?no=' + no);
  }

}
