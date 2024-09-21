import { useEffect, useState } from "react";

export function useWindowSize() {
  const [size, setSize] = useState({ innerWidth: 400, innerHeight: 400 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
    };

    const debouncedHandleResize = debounce(handleResize, 250);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  return size;
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
