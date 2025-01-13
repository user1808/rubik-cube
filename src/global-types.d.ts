export {};

declare global {
  type Nullable<T> = T | null;
  type VoidCallback = () => void;
  type Constructor<T> = new (...args: any[]) => T;
  type ExtractStringKeys<T extends Record> = Extract<keyof T, string>;
  type AddSuffix<T extends keyof any, Suffix extends keyof any> = `${T}${Suffix}`;

  type NumberRange<
    L extends number,
    H extends number,
    Flag extends boolean = false,
    Acc extends unknown[] = [],
  > = Acc['length'] extends H
    ? [...Acc, H][number]
    : Acc['length'] extends L
      ? NumberRange<L, H, true, [...Acc, Acc['length']]>
      : NumberRange<L, H, Flag, [...Acc, Flag extends true ? Acc['length'] : never]>;

  type UnionToIntersection<U> = (U extends any ? (arg: U) => any : never) extends (
    arg: infer I,
  ) => any
    ? I
    : never;

  type LastInUnion<U> =
    UnionToIntersection<U extends unknown ? (x: U) => 0 : never> extends (x: infer L) => 0
      ? L
      : never;

  type UnionToTuple<T, LastInT = LastInUnion<T>> = [T] extends [never]
    ? []
    : [LastInT, ...UnionToTuple<Exclude<T, LastInT>>];

  type IsTuple<T> = [T] extends [never]
    ? false
    : T extends readonly unknown[]
      ? number extends T['length']
        ? false
        : true
      : false;

  type SingleCheck<S> = S extends ''
    ? true
    : S extends `${infer C}${infer T}`
      ? '0' | '1' extends C
        ? false
        : SingleCheck<T>
      : false;

  type IsFixedStringLiteralType<S extends string, T = S> = [S] extends [never]
    ? false
    : S extends unknown
      ? [T] extends [S]
        ? SingleCheck<S>
        : false
      : false;

  type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

  type Reverse<T extends unknown[]> = T extends [infer Head, ...infer Tail]
    ? [...Reverse<Tail>, Head]
    : [];
}
