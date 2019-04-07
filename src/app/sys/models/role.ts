/**
 * 角色类
 * Created by hllinc on 2019/4/7 23:03
 */
import {BaseModel} from '../../models/base-model';

export class Role extends BaseModel {
  public name?: string;
  public info?: string;
  public subSystemId?: number;
}
