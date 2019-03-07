import {Injectable} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {SubSystem} from '../models/sub-system';

@Injectable({
  providedIn: 'root'
})
export class SubSystemService {

  constructor(private dataService: DataService) {
  }

  /**
   * 获取子系统列表
   */
  getSubSystems(): Observable<any> {
    return this.dataService.getData('/sys/subSystem/getSubSystems');
  }

  /**
   * 添加
   * @param subSystem
   */
  addSubSystem(subSystem: SubSystem): Observable<any> {
    return this.dataService.postData('/sys/subSystem/add');
  }

  /**
   * 修改
   * @param subSystem
   */
  modifySubSystem(subSystem: SubSystem): Observable<any> {
    return this.dataService.postData('/sys/subSystem/modify');
  }

  deleteSubSystem(id: number): Observable<any> {
    return this.dataService.postData('/sys/subSystem/delete');
  }
}
