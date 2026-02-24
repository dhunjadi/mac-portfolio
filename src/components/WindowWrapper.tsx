import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Rnd } from "react-rnd";
import type { WindowRect } from "../types";
import { getDesktopRect, getInitialRect } from "../utils";
import { MIN_WINDOW_HEIGHT, MIN_WINDOW_WIDTH } from "../data/constants";

type WindowWrapperProps = {
  children: ReactNode;
  onClose: () => void;
  className?: string;
  disableMinimize?: boolean;
  disableMaximize?: boolean;
  disableResizing?: boolean;
};

const WindowWrapper = ({
  children,
  onClose,
  className = "",
  disableMinimize,
  disableMaximize,
  disableResizing,
}: WindowWrapperProps) => {
  const [rect, setRect] = useState<WindowRect>(getInitialRect());
  const [previousRect, setPreviousRect] = useState<WindowRect | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMinimize = useCallback(() => {
    if (disableMinimize) {
      return;
    }

    onClose();
  }, [disableMinimize, onClose]);

  const handleMaximize = useCallback(() => {
    if (disableMaximize) {
      return;
    }

    if (isMaximized) {
      if (previousRect) {
        setRect(previousRect);
      }
      setIsMaximized(false);
      return;
    }

    setPreviousRect(rect);
    setRect(getDesktopRect());
    setIsMaximized(true);
  }, [disableMaximize, isMaximized, previousRect, rect]);

  useEffect(() => {
    if (!isMaximized) {
      return;
    }

    const handleResize = () => {
      setRect(getDesktopRect());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMaximized]);

  return (
    <Rnd
      size={{ width: rect.width, height: rect.height }}
      position={{ x: rect.x, y: rect.y }}
      minWidth={MIN_WINDOW_WIDTH}
      minHeight={MIN_WINDOW_HEIGHT}
      dragHandleClassName="c-windowWrapper__titleBar"
      enableResizing={!disableResizing && !isMaximized}
      disableDragging={isMaximized}
      cancel=".c-windowWrapper__titleBar_buttons"
      bounds="window"
      onDragStop={(_, data) => {
        setRect((previousRectState) => ({
          ...previousRectState,
          x: data.x,
          y: data.y,
        }));
      }}
      onResizeStop={(_, __, ref, ___, position) => {
        setRect({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: position.x,
          y: position.y,
        });
      }}
    >
      <section
        className={`c-windowWrapper ${isMaximized ? "c-windowWrapper--maximized" : ""} ${className}`.trim()}
      >
        <div className="c-windowWrapper__titleBar">
          <div className="c-windowWrapper__titleBar_buttons">
            <button type="button" className="--close" onClick={onClose} />
            <button
              type="button"
              className="--minimize"
              disabled={disableMinimize}
              onClick={handleMinimize}
            />
            <button
              type="button"
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
