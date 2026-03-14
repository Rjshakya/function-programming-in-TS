/**
 *
 *
 *  Either data type
 *
 *  value is in right side
 *  error is in left side
 *
 */

class Either<E, A> {
  constructor(
    readonly left: E | null,
    readonly right: A | null,
  ) {}

  static Right<A>(v: A) {
    return new Either<never, A>(null, v);
  }

  static Left<E>(e: E) {
    return new Either<E, never>(e, null);
  }

  map<B>(f: (v: A) => B): Either<E, B> {
    if (this.left) {
      return this as unknown as Either<E, B>;
    }

    return Either.Right(f(this.right as A));
  }

  fold<B>(onLeft: (e: E) => B, onRight: (v: A) => B): B {
    return this.left !== null ? onLeft(this.left) : onRight(this.right as A);
  }

  chain<B, EE>(f: (v: A) => Either<E | EE, B>): Either<E | EE, B> {
    return this.left !== null
      ? (this as unknown as Either<E | EE, B>)
      : f(this.right as A);
  }
}

const checkAge = (age: number) => {
  if (age > 18) {
    return Either.Right(age);
  }

  return Either.Left("NOT ELIGIBLE" as const);
};

const program = (age: number, id?: boolean) => {
  return checkAge(age)
    .chain(() => {
      return id ? Either.Right(age) : Either.Left("NO ID" as const);
    })
    .map((v) => `your age is ${v}`)
    .fold(
      (e) => console.error(e),
      (v) => console.info(v),
    );
};

program(19, true);
