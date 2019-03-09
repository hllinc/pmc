/**
 * 资源类
 * Created by Hllinc on 2018/7/17 0017 17:25
 */
import {BaseModel} from '../../models/base-model';

export class Resource extends BaseModel {
  name: string;
  routerLink: string;
  routerLinkActive: boolean;
  icon: string;
  children: Resource[];
}
