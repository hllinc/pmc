/**
 * 工具类
 */
export class Util {

  constructor() {
  }

  /**
   * 时间格式化
   * @param value
   * @param fmt
   */
  public static dateFormat(value: any, fmt: string) { // author: meizz
    const date: Date = new Date(value);
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  }

  /**
   * 扩展对象（浅度）
   * @param target 扩展对象
   * @param source 原始对象
   * @returns {Object}
   */
  public static simpleExtend(target: Object, source: Object): Object {
    for (const p in source) {
      if (source.hasOwnProperty(p)) {
        target[p] = source[p];
      }
    }
    return target;
  }

  /**
   * 扩展对象（深度度）
   * @param target 扩展对象
   * @param source 原始对象
   * @returns {Object}
   */
  public static deepExtend(target: Object, source: Object) {
    for (const p in source) {
      if (source.hasOwnProperty(p)) {
        const copy: any = source[p];
        if (target === copy) { // Array
          continue;
        }
        if (typeof copy === 'object') {
          target[p] = this.deepExtend(target[p] || {}, copy);
        } else {
          target[p] = copy;
        }
      }
    }
    return target;
  }

  /**
   * 数据格式转换
   * @param arr
   */
  public static formatNodeData(arr: any) {
    arr.map((item) => {
      item['title'] = item['name'];
      item['key'] = item['id'];
      if (item['children']) {
        this.formatNodeData(item['children']);
      }
      return item;
    });
  }

}
