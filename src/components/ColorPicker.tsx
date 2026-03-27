type ColorPickerProps = {
  colors: readonly string[];
  value: string;
  onChange: (color: string) => void;
  className?: string;
};

const ColorPicker = ({ colors, value, onChange }: ColorPickerProps) => {
  return (
    <div className="c-colorPicker" role="radiogroup">
      {colors.map((color) => {
        const isActive = color === value;
        return (
          <button
            key={color}
            className={`c-colorPicker__button ${isActive ? "active" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            type="button"
            role="radio"
            aria-checked={isActive}
          />
        );
      })}
    </div>
  );
};

export default ColorPicker;
