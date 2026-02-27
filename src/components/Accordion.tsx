import { useEffect, useRef, useState, type ReactNode } from "react";

type AccordionProps = {
  children: ReactNode;
  className?: string;
};

type AccordionItemProps = {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  triggerClassName?: string;
  panelClassName?: string;
  contentClassName?: string;
};

const Accordion = ({ children, className }: AccordionProps) => {
  return <div className={`c-accordion ${className}`}>{children}</div>;
};

const AccordionItem = ({
  title,
  children,
  className,
  triggerClassName,
  panelClassName,
  contentClassName,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const updateHeight = () => {
      setContentHeight(contentRef.current?.scrollHeight ?? 0);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(contentRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <section
      className={`c-accordion__item ${
        isOpen && "c-accordion__item--open"
      } ${className && className}`}
    >
      <button
        type="button"
        className={`c-accordion__trigger ${triggerClassName}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {title}
      </button>

      <div
        className={`c-accordion__panel ${panelClassName}`}
        style={{ maxHeight: isOpen ? `${contentHeight}px` : "0px" }}
      >
        <div
          ref={contentRef}
          className={`c-accordion__panel_content ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export { Accordion, AccordionItem };
