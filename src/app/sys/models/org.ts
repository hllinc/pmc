/**
 * 组织机构类
 * Created by hllinc on 2018/1/26 14:38
 */
import {BaseModel} from '../../models/base-model';

export class Org extends BaseModel {
  public parentId?: number;
  public name?: string;
  public info?: string;
  public isLeaf?: boolean;
  public subSystemId?: number;
  public children?: Org[];
}
