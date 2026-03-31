import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { useTranslation } from "react-i18next";

type DesktopIconProps = {
  label: string;
  imgSrc: string;
  xPosition?: number;
  yPosition?: number;
  onOpen: () => void;
};

const TAP_MOVE_THRESHOLD = 8;
const DOUBLE_TAP_DELAY = 300;

const DesktopIcon = ({
  label,
  imgSrc,
  onOpen,
  xPosition = 24,
  yPosition = 72,
}: DesktopIconProps) => {
  const { t } = useTranslation();
  const [isSelected, setIsSelected] = useState(false);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null,
  );
  const lastTapTimeRef = useRef(0);

  useEffect(() => {
    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (!iconRef.current) return;
      if (!iconRef.current.contains(event.target as Node)) {
        setIsSelected(false);
      }
    };

    window.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => {
      window.removeEventListener("pointerdown", handleOutsidePointerDown);
    };
  }, []);

  return (
    <Rnd
      default={{
        x: xPosition,
        y: yPosition,
        width: "fit-content",
        height: "fit-content",
      }}
      enableResizing={false}
      bounds="parent"
      className="c-desktopIcon__rnd"
    >
      <div className="c-desktopIcon" ref={iconRef}>
        <button
          type="button"
          className={`c-desktopIcon__button ${isSelected ? "isSelected" : ""}`}
          onPointerDown={(event) => {
            pointerStartRef.current = {
              x: event.clientX,
              y: event.clientY,
              time: Date.now(),
            };
          }}
          onPointerUp={(event) => {
            if (!pointerStartRef.current) return;

            const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
            const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);
            const isTap =
              deltaX <= TAP_MOVE_THRESHOLD && deltaY <= TAP_MOVE_THRESHOLD;

            pointerStartRef.current = null;
            if (!isTap) return;

            setIsSelected(true);

            const now = Date.now();
            const isDoubleTap =
              now - lastTapTimeRef.current <= DOUBLE_TAP_DELAY;
            lastTapTimeRef.current = now;

            if (isDoubleTap) {
              onOpen();
            }
          }}
          aria-label={t("desktopPdf.openAria")}
          title={t("desktopPdf.openTitle")}
        >
          <img src={imgSrc} alt="icon" />
          <span>{label}</span>
        </button>
      </div>
    </Rnd>
  );
};

export default DesktopIcon;
