import type { CSSProperties } from "react";
import { useBrightness } from "../stores/settingsStore";

const MAX_DIM_OPACITY = 0.65;

const BrightnessOverlay = () => {
  const brightness = useBrightness();
  const dimAmount = (1 - brightness / 100) * MAX_DIM_OPACITY;

  return (
    <div
      className="c-brightnessOverlay"
      aria-hidden
      style={
        {
          "--brightness-dim": dimAmount.toString(),
        } as CSSProperties
      }
    />
  );
};

export default BrightnessOverlay;
