/**
 * "Branded" (nominal) types to avoid mixing identifiers.
 * Runtime value is still a string, but TypeScript won't let you
 * accidentally swap e.g. userId with some other string.
 */
export type Brand<T, B extends string> = T & { readonly __brand: B };

export type UserId = Brand<string, 'UserId'>;

export function asUserId(value: string): UserId {
  return value as UserId;
}

