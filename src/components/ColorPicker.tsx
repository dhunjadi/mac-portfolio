type Color = {
  value: string;
  label: string;
};

type ColorPickerProps = {
  colors: Color[];
  selectedColor: string;
  onChange: (color: string) => void;
  className?: string;
};

const ColorPicker = ({ colors, selectedColor, onChange }: ColorPickerProps) => {
  return (
    <div className="c-colorPicker" role="radiogroup">
      {colors.map((color) => {
        const isActive = color.value === selectedColor;
        return (
          <div className="container">
            <button
              key={color.value}
              className={`c-colorPicker__button ${isActive ? "active" : ""}`}
              style={{ backgroundColor: color.value }}
              onClick={() => onChange(color.value)}
              type="button"
              role="radio"
              data-color={color.label}
              aria-checked={isActive}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ColorPicker;
