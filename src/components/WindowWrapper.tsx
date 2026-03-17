import { useState, useRef, type ReactNode } from "react";
import { Rnd } from "react-rnd";
import type { AppleMenuDropdownItem } from "../types";
import {
  useActiveWindowId,
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
  const { focusWindow } = useWindowActions();
  const zIndex = useWindowZIndex(windowId);
  const activeWindowId = useActiveWindowId();
  const isFocused = activeWindowId === windowId;
  const dockPosition = useDockPosition();

  const rndRef = useRef<Rnd | null>(null);
  const savedBounds = useRef<Bounds>(DEFAULT_BOUNDS);
  const currentBounds = useRef<Bounds>(DEFAULT_BOUNDS);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 500);
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
        // eslint-disable-next-line max-len
        className={`c-windowWrapper ${className} ${isClosing ? "closed" : ""} ${isMaximized ? "maximized" : ""} ${isFocused ? "focused" : "unfocused"}`}
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
              onClick={handleClose}
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
