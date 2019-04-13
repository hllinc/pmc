/**
 * 资源类
 * Created by Hllinc on 2018/7/17 0017 17:25
 */
import {BaseModel} from '../../models/base-model';

export class Resource extends BaseModel {
  public name?: string;
  public url?: string;
  public type?: number;
  public icon?: string;
  public info?: string;
  public isLeaf?: boolean;
  public parentId?: number;
  public subSystemId?: number;
  public orderNo?: number;
  public children?: Resource[];
}
