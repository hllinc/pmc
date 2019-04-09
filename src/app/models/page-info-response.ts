/**
 * 分页返回值类
 */
export class PageInfoResponse {
  public total: number;
  public list: any[];
  public pageNum: number;
  public pageSize: number;
  public size: number;
  public startRow: number;
  public endRow: number;
  public pages: number;
  public prePage: number;
  public nextPage: number;
  public isFirstPage: boolean;
  public isLastPage: boolean;
  public hasPreviousPage: boolean;
  public navigatePages: number;
  public navigatepageNums: number[];
  public navigateFirstPage: number;
  public navigateLastPage: number;
  public firstPage: number;
  public lastPage: number;
}
