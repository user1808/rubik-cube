export {};

declare global {
  type Nullable<T> = T | null;

  type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I,
  ) => void
    ? I
    : never;

  type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

  type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
  };

  type ExcludeNever<T> = Exclude<T, never>;
}
