declare module 'td' {
  export function _throttle(func: Function, wait: number): Function;
  export function _debounce(func: Function, wait: number): Function;
}
