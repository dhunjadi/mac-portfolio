import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import resumePreview from "/resume-preview.jpg";
import { useTranslation } from "react-i18next";

type DesktopPdfIconProps = {
  onOpen: () => void;
};

const TAP_MOVE_THRESHOLD = 8;
const DOUBLE_TAP_DELAY = 300;

const DesktopPdfIcon = ({ onOpen }: DesktopPdfIconProps) => {
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
        x: 24,
        y: 72,
        width: "fit-content",
        height: "fit-content",
      }}
      enableResizing={false}
      bounds="parent"
      className="c-desktopResumeIcon__rnd"
    >
      <div className="c-desktopResumeIcon" ref={iconRef}>
        <button
          type="button"
          className={`c-desktopResumeIcon__button ${isSelected ? "isSelected" : ""}`}
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
          <img src={resumePreview} alt={t("desktopPdf.fileAlt")} />
          <span>{t("desktopPdf.fileName")}</span>
        </button>
      </div>
    </Rnd>
  );
};

export default DesktopPdfIcon;
