export const assertUnreachable = (_arg: never): never => {
  throw new Error("This part of code shouldn't be reachable");
};
