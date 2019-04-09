import {Injectable} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {PageInfoResponse} from '../../models/page-info-response';

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

}
