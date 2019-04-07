/**
 * 用户类
 */
import {BaseModel} from '../../models/base-model';

export class User extends BaseModel {
  public username: string;
  public password: string;
  public email: string;
  public orgId: number;
}
