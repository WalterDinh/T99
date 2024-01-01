export default class DebounceHelper {
    timer: ReturnType<typeof setTimeout> | undefined;
    constructor() {
      this.timer = undefined;
    }
    debounce(func: () => void, ms: number) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        func && func();
      }, ms);
    }
}
