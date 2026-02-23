import { useState, useRef, useLayoutEffect } from "react";
import WindowWrapper from "../WindowWrapper";

type CalculatorWindowProps = {
  onClose: () => void;
};

const CalculatorWindow = ({ onClose }: CalculatorWindowProps) => {
  const value = "12312425345453";

  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const textWidth = textRef.current.scrollWidth;

      // Padding offset --> 8px on each side = 16px
      const availableWidth = containerWidth - 16;

      if (textWidth > availableWidth) {
        setScale(availableWidth / textWidth);
      } else {
        setScale(1);
      }
    }
  }, [value]);

  return (
    <WindowWrapper
      onClose={onClose}
      disableMinimize
      disableMaximize
      disableResizing
    >
      <div className="w-calculator">
        <div className="w-calculator__display" ref={containerRef}>
          <span
            className="w-calculator__display-text"
            ref={textRef}
            style={{ transform: `scale(${scale})` }}
          >
            {value}
          </span>
        </div>

        <div className="w-calculator__keys">
          <button className="w-calculator__keys_key w-calculator__keys_key--fn">
            AC
          </button>
          <button className="w-calculator__keys_key w-calculator__keys_key--fn">
            +/-
          </button>
          <button className="w-calculator__keys_key w-calculator__keys_key--fn">
            %
          </button>
          <button className="w-calculator__keys_key w-calculator__keys_key--operator">
            ÷
          </button>

          <button className="w-calculator__keys_key">7</button>
          <button className="w-calculator__keys_key">8</button>
          <button className="w-calculator__keys_key">9</button>
          <button className="w-calculator__keys_key w-calculator__keys_key--operator">
            ×
          </button>

          <button className="w-calculator__keys_key">4</button>
          <button className="w-calculator__keys_key">5</button>
          <button className="w-calculator__keys_key">6</button>
          <button className="w-calculator__keys_key w-calculator__keys_key--operator">
            −
          </button>

          <button className="w-calculator__keys_key">1</button>
          <button className="w-calculator__keys_key">2</button>
          <button className="w-calculator__keys_key">3</button>
          <button className="w-calculator__keys_key w-calculator__keys_key--operator">
            +
          </button>

          <button className="w-calculator__keys_key w-calculator__keys_key--span2">
            0
          </button>
          <button className="w-calculator__keys_key">,</button>
          <button className="w-calculator__keys_key w-calculator__keys_key--operator">
            =
          </button>
        </div>
      </div>
    </WindowWrapper>
  );
};

export default CalculatorWindow;
