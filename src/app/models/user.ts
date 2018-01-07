export class User {
  constructor(
    public sub: string,
    public yongHuMing: string,
    public yongHuGangWeis: GangWei[],
    public zuZhis: any
  ) {}
}

export class GangWei {
  constructor(
    public gangweibianma: string,
    public quancheng: string,
    public shifouzhugangwei: boolean,
    public zuzhilujing: string
  ) {}
}
