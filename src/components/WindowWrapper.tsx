import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Rnd } from "react-rnd";
import type { AppleMenuDropdownItem } from "../types";
import {
  useActiveWindowId,
  useIsWindowMinimized,
  useWindowActions,
  useWindowZIndex,
} from "../stores/windowStore";
import { useDockPosition } from "../stores/settingsStore";
import useDoubleActivate from "../hooks/useDoubleActivate";

type WindowWrapperProps = {
  windowId: AppleMenuDropdownItem;
  children: ReactNode;
  onClose: () => void;
  className?: string;
  disableMinimize?: boolean;
  disableMaximize?: boolean;
  disableResizing?: boolean;
};

type Bounds = {
  x: number;
  y: number;
  width: number | string;
  height: number | string;
};

const DEFAULT_BOUNDS: Bounds = {
  x: 10,
  y: 50,
  width: "fit-content",
  height: "fit-content",
};

const WindowWrapper = ({
  windowId,
  children,
  onClose,
  className = "",
  disableMinimize,
  disableMaximize,
  disableResizing,
}: WindowWrapperProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const { focusWindow, minimizeWindow } = useWindowActions();
  const zIndex = useWindowZIndex(windowId);
  const activeWindowId = useActiveWindowId();
  const isMinimized = useIsWindowMinimized(windowId);
  const isFocused = activeWindowId === windowId;
  const dockPosition = useDockPosition();

  const rndRef = useRef<Rnd | null>(null);
  const savedBounds = useRef<Bounds>(DEFAULT_BOUNDS);
  const currentBounds = useRef<Bounds>(DEFAULT_BOUNDS);
  const minimizeTimerRef = useRef<number | null>(null);
  const restoreTimerRef = useRef<number | null>(null);
  const wasMinimizedRef = useRef(isMinimized);

  useEffect(() => {
    return () => {
      if (minimizeTimerRef.current)
        window.clearTimeout(minimizeTimerRef.current);
      if (restoreTimerRef.current) window.clearTimeout(restoreTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (wasMinimizedRef.current && !isMinimized) {
      // Intentional UI transition state when restoring from Dock.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsRestoring(true);
      restoreTimerRef.current = window.setTimeout(() => {
        setIsRestoring(false);
        restoreTimerRef.current = null;
      }, 260);
    }
    wasMinimizedRef.current = isMinimized;
  }, [isMinimized]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 500);
  };

  const handleMinimize = () => {
    if (disableMinimize || isMinimizing) return;
    setIsMinimizing(true);
    minimizeTimerRef.current = window.setTimeout(() => {
      minimizeWindow(windowId);
      setIsMinimizing(false);
      minimizeTimerRef.current = null;
    }, 240);
  };

  const handleMaximize = () => {
    if (disableMaximize || !rndRef.current) return;

    setIsAnimating(true);

    if (isMaximized) {
      const { x, y, width, height } = savedBounds.current;
      rndRef.current.updatePosition({ x, y });
      rndRef.current.updateSize({
        width: typeof width === "number" ? width : "fit-content",
        height: typeof height === "number" ? height : "fit-content",
      });
      setIsMaximized(false);
    } else {
      savedBounds.current = { ...currentBounds.current };

      const style = getComputedStyle(document.documentElement);
      const menuBarHeight =
        parseFloat(style.getPropertyValue("--menubar-height")) || 0;
      const dockHeight =
        parseFloat(style.getPropertyValue("--dock-height")) || 0;
      const dockWidth = parseFloat(style.getPropertyValue("--dock-width")) || 0;
      const dockBottomOffset = 4;
      const dockSideOffset = 12;

      if (dockPosition === "left") {
        rndRef.current.updatePosition({
          x: dockWidth + dockSideOffset,
          y: menuBarHeight,
        });
        rndRef.current.updateSize({
          width: window.innerWidth - dockWidth - dockSideOffset,
          height: window.innerHeight - menuBarHeight,
        });
      } else if (dockPosition === "right") {
        rndRef.current.updatePosition({ x: 0, y: menuBarHeight });
        rndRef.current.updateSize({
          width: window.innerWidth - dockWidth - dockSideOffset,
          height: window.innerHeight - menuBarHeight,
        });
      } else {
        rndRef.current.updatePosition({ x: 0, y: menuBarHeight });
        rndRef.current.updateSize({
          width: window.innerWidth,
          height:
            window.innerHeight - menuBarHeight - dockHeight - dockBottomOffset,
        });
      }
      setIsMaximized(true);
    }

    setTimeout(() => setIsAnimating(false), 300);
  };
  const { onDoubleClick, onTouchEnd } = useDoubleActivate({
    onActivate: handleMaximize,
  });

  const minimizeStyle: CSSProperties & {
    "--minimize-translate-x": string;
    "--minimize-translate-y": string;
  } =
    dockPosition === "left"
      ? {
          "--minimize-translate-x": "-45vw",
          "--minimize-translate-y": "20vh",
        }
      : dockPosition === "right"
        ? {
            "--minimize-translate-x": "45vw",
            "--minimize-translate-y": "20vh",
          }
        : {
            "--minimize-translate-x": "0",
            "--minimize-translate-y": "42vh",
          };

  return (
    <Rnd
      ref={rndRef}
      default={DEFAULT_BOUNDS}
      style={{
        zIndex,
        transition: isAnimating
          ? "width 0.3s ease, height 0.3s ease, transform 0.3s ease, opacity 0.25s ease"
          : "opacity 0.25s ease",
      }}
      dragHandleClassName="c-windowWrapper__titleBar"
      enableResizing={disableResizing || isMaximized ? false : true}
      disableDragging={isMaximized}
      cancel=".c-windowWrapper__titleBar_buttons"
      onMouseDown={() => focusWindow(windowId)}
      onTouchStart={() => focusWindow(windowId)}
      onDragStop={(_e, d) => {
        currentBounds.current = {
          ...currentBounds.current,
          x: d.x,
          y: d.y,
        };
      }}
      onResizeStop={(_e, _dir, ref, _delta, position) => {
        currentBounds.current = {
          x: position.x,
          y: position.y,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        };
      }}
    >
      <section
        className={`c-windowWrapper ${className} ${isClosing ? "closed" : ""} ${isMaximized ? "maximized" : ""} ${isFocused ? "focused" : "unfocused"} ${isMinimizing || isMinimized ? "minimizing" : ""} ${isRestoring ? "restoring" : ""}`}
        style={minimizeStyle}
      >
        <div
          className="c-windowWrapper__titleBar"
          onDoubleClick={onDoubleClick}
          onTouchEnd={onTouchEnd}
        >
          <div className="c-windowWrapper__titleBar_buttons">
            <button className="--close" onClick={handleClose} />
            <button
              className="--minimize"
              disabled={disableMinimize}
              onClick={handleMinimize}
            />
            <button
              className="--maximize"
              disabled={disableMaximize}
              onClick={handleMaximize}
            />
          </div>
        </div>

        <div className="c-windowWrapper__content">{children}</div>
      </section>
    </Rnd>
  );
};

export default WindowWrapper;
