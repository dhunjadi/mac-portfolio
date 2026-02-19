import type { ReactNode } from "react";

type WindowWrapperProps = {
  children: ReactNode;
  onClose: () => void;
  className?: string;
  disableMinimize?: boolean;
  disableMaximize?: boolean;
};

const WindowWrapper = ({
  children,
  onClose,
  className = "",
  disableMinimize,
  disableMaximize,
}: WindowWrapperProps) => {
  return (
    <section className={`c-windowWrapper ${className}`.trim()}>
      <div className="c-windowWrapper__titleBar">
        <div className="c-windowWrapper__titleBar_buttons">
          <button className="--close" onClick={onClose} />
          <button className="--minimize" disabled={disableMinimize} />
          <button className="--maximize" disabled={disableMaximize} />
        </div>
      </div>

      <div className="c-windowWrapper__content">{children}</div>
    </section>
  );
};

export default WindowWrapper;
