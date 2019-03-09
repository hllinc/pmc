/**
 * 用户类
 */
import {BaseModel} from '../../models/base-model';

export class User extends BaseModel {
  username: string;
  password: string;
  remeberMe: boolean;
  email: string;
  confirmPassword: string;
  vcode: string;
}
