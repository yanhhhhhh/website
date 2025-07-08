/// <reference path="src/types.d.ts" />

// 属性二选一
type EitherOr<O extends Object, L extends string, R extends string> = (
  | PartialEither<Pick<O, L | R>, L>
  | PartialEither<Pick<O, L | R>, R>
) &
  Omit<O, L | R>;

// 固定长度的数组
type FixedLengthArray<T, N extends number> = [T, ...T[]] & { length: N };
