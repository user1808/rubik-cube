export abstract class Radians {
  public static readonly ['18deg']: number = Math.PI / 10;
  public static readonly ['35deg']: number = (7 / 36) * Math.PI;
  public static readonly ['36deg']: number = (1 / 5) * Math.PI;
  public static readonly ['45deg']: number = Math.PI / 4;
  public static readonly ['54deg']: number = (3 / 10) * Math.PI;
  public static readonly ['60deg']: number = Math.PI / 3;
  public static readonly ['72deg']: number = (2 / 5) * Math.PI;
  public static readonly ['90deg']: number = Math.PI / 2;
  public static readonly ['108deg']: number = (3 / 5) * Math.PI;
  public static readonly ['120deg']: number = (2 / 3) * Math.PI;
  public static readonly ['144deg']: number = (4 / 5) * Math.PI;
  public static readonly ['180deg']: number = Math.PI;

  public static angleToRadians = (angle: number) => (angle * Math.PI) / 180;
}
