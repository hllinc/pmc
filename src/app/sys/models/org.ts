/**
 * 组织机构类
 * Created by hllinc on 2018/1/26 14:38
 */
export class Org {
  public id?: number;
  public parentId?: number;
  public name?: string;
  public orderNo?: number;
  public info?: string;
  public children?: Org[];
}
