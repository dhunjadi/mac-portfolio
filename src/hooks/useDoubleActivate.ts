import { useCallback, useEffect, useRef } from "react";

type UseDoubleActivateOptions = {
  onActivate: () => void;
  delay?: number;
  enabled?: boolean;
  target?: "element" | "document";
};

type DoubleActivateHandlers = {
  onDoubleClick: () => void;
  onTouchEnd: () => void;
};

const DEFAULT_DELAY = 300;

const useDoubleActivate = ({
  onActivate,
  delay = DEFAULT_DELAY,
  enabled = true,
  target = "element",
}: UseDoubleActivateOptions): DoubleActivateHandlers => {
  const lastTapRef = useRef(0);

  const handleDoubleClick = useCallback(() => {
    if (!enabled) return;
    onActivate();
  }, [enabled, onActivate]);

  const handleTouchEnd = useCallback(() => {
    if (!enabled) return;

    const now = Date.now();
    const delta = now - lastTapRef.current;

    if (delta > 0 && delta < delay) {
      onActivate();
      lastTapRef.current = 0;
      return;
    }

    lastTapRef.current = now;
  }, [delay, enabled, onActivate]);

  useEffect(() => {
    if (target !== "document" || !enabled) return;

    document.addEventListener("dblclick", handleDoubleClick);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("dblclick", handleDoubleClick);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [enabled, handleDoubleClick, handleTouchEnd, target]);

  return {
    onDoubleClick: handleDoubleClick,
    onTouchEnd: handleTouchEnd,
  };
};

export default useDoubleActivate;
