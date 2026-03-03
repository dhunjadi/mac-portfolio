import { useState, type ReactNode } from "react";
import { Rnd } from "react-rnd";

type WindowWrapperProps = {
  children: ReactNode;
  onClose: () => void;
  className?: string;
  disableMinimize?: boolean;
  disableMaximize?: boolean;
  disableResizing?: boolean;
};

const WindowWrapper = ({
  children,
  onClose,
  className = "",
  disableMinimize,
  disableMaximize,
  disableResizing,
}: WindowWrapperProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };
  return (
    <Rnd
      default={{
        x: 10,
        y: 50,
        width: "fit-content",
        height: "fit-content",
      }}
      style={{ zIndex: 99 }} // needs to be set inline to hide desktop icons
      dragHandleClassName="c-windowWrapper__titleBar"
      enableResizing={disableResizing ? false : true}
      cancel=".c-windowWrapper__titleBar_buttons"
    >
      <section
        className={`c-windowWrapper ${className} ${isClosing ? "closed" : ""}`}
      >
        <div className="c-windowWrapper__titleBar">
          <div className="c-windowWrapper__titleBar_buttons">
            <button className="--close" onClick={handleClose} />
            <button className="--minimize" disabled={disableMinimize} />
            <button className="--maximize" disabled={disableMaximize} />
          </div>
        </div>

        <div className="c-windowWrapper__content">{children}</div>
      </section>
    </Rnd>
  );
};

export default WindowWrapper;
