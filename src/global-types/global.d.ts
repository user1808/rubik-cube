export {};

declare global {
  type Nullable<T> = T | null;
  type VoidCallback = () => void;
}
