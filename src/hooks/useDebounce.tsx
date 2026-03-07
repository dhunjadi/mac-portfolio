import { useState, useEffect } from "react";

export const useDebounce = (
  value: string,
  delay: number,
  fallback: string,
): string => {
  const [text, setText] = useState(fallback);
  useEffect(() => {
    if (!value.trim()) return;
    const timeout = setTimeout(() => setText(value.trim()), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return text;
};
