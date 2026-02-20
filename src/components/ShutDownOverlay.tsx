import { useEffect, useState } from "react";

import { useShutDownStore } from "../stores/shutDownStore";

const ShutDownOverlay = () => {
  const isShutDown = useShutDownStore((state) => state.isShutDown);

  console.log(isShutDown);

  const [isInvisible, setIsInvisible] = useState(true);

  useEffect(() => {
    if (isShutDown) {
      const timer = setTimeout(() => setIsInvisible(false), 750);
      return () => clearTimeout(timer);
    }
  }, [isShutDown]);

  return (
    <div
      className={`c-shutDownOverlay ${isShutDown ? "" : "hidden"} ${isInvisible ? "invisible" : ""}`}
    >
      Shutting down
    </div>
  );
};

export default ShutDownOverlay;
