interface IOption<T> {
  value?: T;
  map: <B>(f: (a: T) => B) => IOption<B>;
  flatMap: <B>(f: (a: T) => IOption<B>) => IOption<B>;
  filter: (f: (a: T) => boolean) => IOption<T>;
  getOrElse: <B>(defValue: B) => T | B;
}

class FOption<T> {
  value?: T | undefined;

  constructor(v?: T) {
    this.value = v;
  }

  static of<T>(v: T | undefined) {
    return new FOption(v);
  }

  static map2<A, B, C>(a: FOption<A>, b: FOption<B>) {
    const valA = a.value;
    const valB = b.value;

    if (!a || !b || !valA || !valB) {
      return (f: (a2: A, b2: B) => FOption<C>) => FOption.of<C>(undefined);
    }

    return (f: (a2: A, b2: B) => FOption<C>) => f(valA, valB);
  }

  map<B>(f: (a: T) => B): FOption<B> {
    return this.value !== undefined
      ? FOption.of(f(this.value))
      : FOption.of(undefined as B);
  }

  flatMap<B>(f: (a: T) => FOption<B>): FOption<B> {
    return this.value !== undefined
      ? f(this.value)
      : FOption.of(undefined as B);
  }

  filter(f: (a: T) => boolean): FOption<T> {
    if (this.value !== undefined && this.value !== null && f(this.value)) {
      return this;
    }

    return FOption.of(undefined as T);
  }

  getOrElse<B>(val: B | (() => B)): T | B {
    if (this.value !== undefined && this.value !== null) return this.value;
    return val instanceof Function ? val() : val;
  }
}

const users = [
  { id: 0, name: "simon" },
  { id: 1, name: "prince" },
  { id: 2, name: "zen" },
];

const user0 = FOption.of(0).map((a) => users.find((u) => u.id === a));

const user2 = FOption.of(2).map((a) => users.find((u) => u.id === a));

const final = FOption.map2(
  user0,
  user2,
)((u1, u2) => {
  if (!u1 || !u2) return FOption.of(undefined);
  return FOption.of<number>(u1.id + u2.id);
});

console.log(final);
 