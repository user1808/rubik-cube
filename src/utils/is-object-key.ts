export const isObjectKey = <U extends Record<keyof any, unknown>>(
  potentialKey: keyof any,
  object: U,
): potentialKey is keyof U => potentialKey in object;
