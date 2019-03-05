import { Injectable } from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubSystemService {

  constructor(private dataService: DataService) { }

  /**
   * 获取子系统列表
   */
  getSubSystems(): Observable<any> {
    return this.dataService.getData('/sys/subSystem/getSubSystems');
  }
}
