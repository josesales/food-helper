import { useRef } from "react";

export const useDebounce = (delay) => {
  const timerRef = useRef(null);

  const debouncedFunction = (func) => {
    return (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  return debouncedFunction;
};
