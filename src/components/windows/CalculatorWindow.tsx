import { useState, useRef, useLayoutEffect, useReducer } from "react";
import WindowWrapper from "../WindowWrapper";

type CalculatorWindowProps = {
  onClose: () => void;
};

type ReducerState = {
  currentValue: string;
  previousValue: string | null;
  operator: string | null;
  overwrite: boolean;
};

type ReducerAction =
  | { type: "ADD_DIGIT"; digit: string }
  | { type: "CHOOSE_OPERATION"; operation: string }
  | { type: "CLEAR" }
  | { type: "EVALUATE" }
  | { type: "PERCENT" }
  | { type: "TOGGLE_SIGN" };

const initialState: ReducerState = {
  currentValue: "0",
  previousValue: null,
  operator: null,
  overwrite: false,
};

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case "ADD_DIGIT":
      if (state.overwrite) {
        return {
          ...state,
          currentValue: action.digit === "," ? "0," : action.digit,
          overwrite: false,
        };
      }
      if (action.digit === "0" && state.currentValue === "0") return state;
      if (action.digit === "," && state.currentValue.includes(","))
        return state;

      return {
        ...state,
        currentValue:
          state.currentValue === "0" && action.digit !== ","
            ? action.digit
            : `${state.currentValue}${action.digit}`,
      };

    case "CHOOSE_OPERATION":
      if (state.previousValue == null) {
        return {
          ...state,
          operator: action.operation,
          previousValue: state.currentValue,
          currentValue: "0",
        };
      }
      return {
        ...state,
        previousValue: evaluate(state),
        operator: action.operation,
        currentValue: "0",
      };

    case "CLEAR":
      return initialState;

    case "EVALUATE":
      if (state.operator == null || state.previousValue == null) return state;
      return {
        ...state,
        overwrite: true,
        previousValue: null,
        operator: null,
        currentValue: evaluate(state),
      };

    case "PERCENT": {
      const val = parseFloat(state.currentValue.replace(",", "."));
      return {
        ...state,
        currentValue: (val / 100).toString().replace(".", ","),
      };
    }

    case "TOGGLE_SIGN": {
      const toggled = parseFloat(state.currentValue.replace(",", ".")) * -1;
      return {
        ...state,
        currentValue: toggled.toString().replace(".", ","),
      };
    }

    default:
      return state;
  }
}

function evaluate({
  currentValue,
  previousValue,
  operator,
}: ReducerState): string {
  const prev = parseFloat(previousValue?.replace(",", ".") || "0");
  const current = parseFloat(currentValue.replace(",", ".") || "0");

  let result = 0;
  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "−":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "÷":
      result = current !== 0 ? prev / current : 0;
      break;
    default:
      return currentValue;
  }

  // Format to avoid long floating point trails
  return parseFloat(result.toFixed(8)).toString().replace(".", ",");
}

const CalculatorWindow = ({ onClose }: CalculatorWindowProps) => {
  const [{ currentValue }, dispatch] = useReducer(reducer, initialState);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const textWidth = textRef.current.scrollWidth;

      // Padding offset --> 12px on each side = 24px
      const availableWidth = containerWidth - 24;

      if (textWidth > availableWidth) {
        setScale(availableWidth / textWidth);
      } else {
        setScale(1);
      }
    }
  }, [currentValue]);

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
            role="result"
          >
            {currentValue}
          </span>
        </div>

        <div className="w-calculator__keys">
          <button
            onClick={() => dispatch({ type: "CLEAR" })}
            className="w-calculator__keys_key w-calculator__keys_key--fn"
          >
            AC
          </button>
          <button
            onClick={() => dispatch({ type: "TOGGLE_SIGN" })}
            className="w-calculator__keys_key w-calculator__keys_key--fn"
          >
            +/-
          </button>
          <button
            onClick={() => dispatch({ type: "PERCENT" })}
            className="w-calculator__keys_key w-calculator__keys_key--fn"
          >
            %
          </button>
          <button
            onClick={() =>
              dispatch({ type: "CHOOSE_OPERATION", operation: "÷" })
            }
            className="w-calculator__keys_key w-calculator__keys_key--operator"
          >
            ÷
          </button>

          {[7, 8, 9].map((number) => (
            <button
              key={number}
              onClick={() =>
                dispatch({ type: "ADD_DIGIT", digit: number.toString() })
              }
              className="w-calculator__keys_key"
            >
              {number}
            </button>
          ))}
          <button
            onClick={() =>
              dispatch({ type: "CHOOSE_OPERATION", operation: "×" })
            }
            className="w-calculator__keys_key w-calculator__keys_key--operator"
          >
            ×
          </button>

          {[4, 5, 6].map((number) => (
            <button
              key={number}
              onClick={() =>
                dispatch({ type: "ADD_DIGIT", digit: number.toString() })
              }
              className="w-calculator__keys_key"
            >
              {number}
            </button>
          ))}
          <button
            onClick={() =>
              dispatch({ type: "CHOOSE_OPERATION", operation: "−" })
            }
            className="w-calculator__keys_key w-calculator__keys_key--operator"
          >
            −
          </button>

          {[1, 2, 3].map((number) => (
            <button
              key={number}
              onClick={() =>
                dispatch({ type: "ADD_DIGIT", digit: number.toString() })
              }
              className="w-calculator__keys_key"
            >
              {number}
            </button>
          ))}
          <button
            onClick={() =>
              dispatch({ type: "CHOOSE_OPERATION", operation: "+" })
            }
            className="w-calculator__keys_key w-calculator__keys_key--operator"
          >
            +
          </button>

          <button
            onClick={() => dispatch({ type: "ADD_DIGIT", digit: "0" })}
            className="w-calculator__keys_key w-calculator__keys_key--span2"
          >
            0
          </button>
          <button
            onClick={() => dispatch({ type: "ADD_DIGIT", digit: "," })}
            className="w-calculator__keys_key"
          >
            ,
          </button>
          <button
            onClick={() => dispatch({ type: "EVALUATE" })}
            className="w-calculator__keys_key w-calculator__keys_key--operator"
          >
            =
          </button>
        </div>
      </div>
    </WindowWrapper>
  );
};

export default CalculatorWindow;
