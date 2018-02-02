/**
 * Created by hllinc on 2018/1/26 14:38
 */
export class Org {
  public id?: number;
  public pid?: number;
  public name?: string;
  public no?: string;
  public orderNumber?: number;
  public info?: string;
  public enable?: boolean;
  public hasChildren?: boolean;
  public children?: Org[];
}
