/// <reference path="index.d.ts" />

import { _throttle } from 'td';
import { _debounce } from 'td'

function debounce(wait: number): Function {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    if(descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    }

    descriptor.value = function(func: Function): Function {
      return _debounce(func, wait);
    };

    return descriptor;
  }
}


function throttle(wait: number): Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    if(descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    }

    descriptor.value = function (func: Function): Function {
      return _throttle(func, wait);
    };

    return descriptor;
  }

}


