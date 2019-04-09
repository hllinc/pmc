import {Injectable} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {SubSystem} from '../models/sub-system';
import {PageInfoResponse} from '../../models/page-info-response';

@Injectable({
  providedIn: 'root'
})
export class SubSystemService {

  constructor(private dataService: DataService) {
  }

  /**
   * 获取子系统列表
   */
  getSubSystems(pageNum: number, pageSize: number): Observable<PageInfoResponse> {
    return this.dataService.get('/sys/subSystem/selectPage?pageNum=' + pageNum + '&pageSize=' + pageSize);
  }

  /**
   * 根据id获取单个子系统
   * @param id
   */
  getSubSystemById(id: number): Observable<any> {
    return this.dataService.get('/sys/subSystem/' + id);
  }

  /**
   * 添加
   * @param subSystem
   */
  addSubSystem(subSystem: SubSystem): Observable<any> {
    return this.dataService.post('/sys/subSystem/add', subSystem);
  }

  /**
   * 修改
   * @param subSystem
   */
  modifySubSystem(subSystem: SubSystem): Observable<any> {
    return this.dataService.post('/sys/subSystem/update', subSystem);
  }

  /**
   * 单个删除
   * @param id
   */
  deleteSubSystem(id: number): Observable<any> {
    return this.dataService.delete('/sys/subSystem/delete/' + id);
  }
}
