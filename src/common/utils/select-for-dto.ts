export type SelectForDto<T> = {
  [K in keyof T]?: T[K] extends Array<infer U> ? { select: SelectForDto<U> } : true;
};

