export {};

declare global {
  type Nullable<T> = T | null;
  type VoidCallback = () => void;
  type Constructor<T> = new (...args: any[]) => T;
}
