/**
 *
 *   functional programming in scala exercises
 *
 *
 */

// exercises 2.3
function currying<A, B, C>(f: (a: A, b: B) => C) {
  return (a: A) => (b: B) => f(a, b);
}

const hop = (a: string, b: string) => (a === b ? `${a} === ${b}` : `${a} !== ${b}`);

const curriedHop = currying(hop);
const res = curriedHop("a")("b");

// exercises 2.4
function uncurry<A, B, C>(f: (a: A) => (b: B) => C) {
  return (a: A, b: B) => f(a)(b);
}

const uncurriedHop = uncurry(curriedHop);
const res2 = uncurriedHop("a", "b");

// exercises 2.5

function compose<A, B, C>(f: (b: B) => C, g: (a: A) => B): (a: A) => C {
  return (a: A) => {
    const gres = g(a);
    return f(gres);
  };
}

const composedHop = compose((b:string) => `this is ${b}`, (a:number) => a.toString());
const res3 = composedHop(42)



console.log(res);
console.log(res2);
console.log(res3);
