export const isT = <T>(toCheck: unknown, tConstructor: Constructor<T>): toCheck is T =>
  toCheck instanceof tConstructor;
