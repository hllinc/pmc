import { Injectable } from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {Resource} from '../models/resource';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private dataService: DataService) {
  }

  /**
   * 获取根节点
   * @returns {Observable<any>}
   */
  getResourceDataBySubSystemId(id: number): Observable<any> {
    return this.dataService.get('/sys/resource/getBySubSystemId/' + id);
  }

  /**
   * 根据父id获取列表
   * @param {number} pid
   * @returns {Observable<any>}
   */
  getOrgsByParentId(pid: any): Observable<any> {
    return this.dataService.get('/sys/resource/getChildrenById/' + pid);
  }

  /**
   * 添加
   * @param {Resource} resource
   * @returns {Observable<any>}
   */
  addResource(resource: Resource): Observable<any> {
    return this.dataService.post('/sys/resource/add', resource);
  }

  /**
   * 更新
   * @param {Resource} resource
   * @returns {Observable<any>}
   */
  updateResource(resource: Resource): Observable<any> {
    return this.dataService.post('/sys/resource/update', resource);
  }

  /**
   * 根据id删除
   * @param {number} id
   * @returns {Observable<any>}
   */
  deleteById(id: number): Observable<any> {
    // to-do: 级联删除
    return this.dataService.delete('/sys/resource/delete/' + id);
  }
}
