# Throttle-Debounce library

This library implements throttle and debounce functions.

This library implements in JavaScript and also you can use them 
as decorators in TypeScript 

## throttle(func, wait)
Creates a throttled function that only invokes func at most once per every wait milliseconds.
The throttled function comes with a cancel method to cancel delayed func invocations and a flush method to immediately invoke them.
The func is invoked with the last arguments provided to the throttled function.
Subsequent calls to the throttled function return the result of the last func invocation.

[Function desciption got from Lodash](https://lodash.com/docs/4.17.2#throttle)

**Attributes:**
1. func (Function) - The function to throttle
2. wait (number) - The number in milliseconds to delay

```
***JavaScript***
// web
var f = td.throttle(function(a) { console.log('Hello ' + a) }, 2000);

// node
var td = requare('./index');
var f = td.throttle(function(a) { console.log('Hello ' + a) }, 2000);

***TypeScript***
class Foo {
  @debounce(5000)
  f1() {}
  @throttle(5000)
  f2() {}
}
```

## debounce(func, wait)
Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.
The debounced function comes with a cancel method to cancel delayed func invocations and a flush method to immediately invoke them.
The func is invoked with the last arguments provided to the debounced function.
Subsequent calls to the debounced function return the result of the last func invocation.

[Function desciption got from Lodash](https://lodash.com/docs/4.17.2#debounce)

**Attributes:**
1. func (Function) - The function to debounce
2. wait (number) - The number in milliseconds to delay



