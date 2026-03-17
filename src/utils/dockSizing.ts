export type DockIconSizeLimits = {
  min: number;
  max: number;
};

const TABLET_MIN = 768;
const DESKTOP_MIN = 992;

export const getDockIconSizeLimits = (width: number): DockIconSizeLimits => {
  if (width >= DESKTOP_MIN) {
    return { min: 32, max: 56 };
  }

  if (width >= TABLET_MIN) {
    return { min: 36, max: 60 };
  }

  return { min: 28, max: 48 };
};

export const clampDockIconSize = (
  value: number,
  limits: DockIconSizeLimits,
): number => Math.max(limits.min, Math.min(limits.max, value));
