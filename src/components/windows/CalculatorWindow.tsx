import WindowWrapper from "../WindowWrapper";

type CalculatorWindowProps = {
  onClose: () => void;
};

const CalculatorWindow = ({ onClose }: CalculatorWindowProps) => {
  return (
    <WindowWrapper
      className="w-calculator"
      onClose={onClose}
      disableMinimize
      disableMaximize
      disableResizing
    >
      <div className="w-calculator__display">0</div>

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
    </WindowWrapper>
  );
};

export default CalculatorWindow;
