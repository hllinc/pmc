/**
 * Created by Hllinc on 2017-09-25 0025 12:24
 */
export class Page {
  /**
   * 分页类
   * @param {number} number 当前页码
   * @param {number} size 每页显示条数
   * @param {number} totalPages 总页数
   * @param {number} totalElements
   * @param sort
   * @param {number} numberOfElements
   * @param content
   * @param condition
   */
  constructor (public number: number,
               public size: number,
               public condition?: any,
               public totalPages?: number,
               public totalElements?: number,
               public sort?: any,
               public numberOfElements?: number,
               public content?: any) {}
}
