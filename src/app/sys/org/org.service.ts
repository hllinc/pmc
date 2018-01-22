import {Injectable} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs/Observable';

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

}
