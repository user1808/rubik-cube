export abstract class TypeGuards {
  public static isT = <T>(value: unknown, TConstructor: Constructor<T>): value is T => {
    return value instanceof TConstructor;
  };

  public static isObjectKey = <U extends Record<keyof any, unknown>>(
    key: keyof any,
    object: U,
  ): key is keyof U => {
    return key in object;
  };
}
