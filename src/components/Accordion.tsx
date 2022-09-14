import { useCallback, useEffect, useState } from "react";
import { useUID } from "react-uid";
import { styles } from "@amsterdam/asc-ui";
import { ChevronDown } from "@amsterdam/asc-assets";

const AccordionButton = styles.AccordionButton;
const AccordionButtonContent = styles.AccordionButtonContent;
const AccordionContent = styles.AccordionContent;

interface Props {
  onToggle?: (open: boolean) => void;
  isOpen?: boolean;
  noMultiline?: boolean;
  HTMLTitle?: React.ReactNode;
  id: string;
  children: React.ReactNode;
  title: string;
  className?: string;
}

function Accordion({ children, title, id: idProp, isOpen, onToggle, noMultiline, HTMLTitle, className }: Props) {
  const uid = useUID();
  const id = idProp || uid;
  const [open, setOpen] = useState(isOpen ?? false);

  useEffect(() => {
    if (isOpen !== undefined && isOpen !== open) {
      setOpen(isOpen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClick = useCallback(() => {
    const newOpenState = !open;
    if (onToggle) {
      onToggle(newOpenState);
    }
    setOpen(newOpenState);
  }, [open, onToggle]);

  return (
    <>
      <AccordionButton
        aria-controls={id}
        aria-expanded={open}
        id={`label-${id}`}
        type="button"
        variant="tertiary"
        iconRight={<ChevronDown />}
        isOpen={open}
        title={title}
        onClick={handleClick}
        className={className}
      >
        <AccordionButtonContent noMultiline={noMultiline}>{HTMLTitle || title}</AccordionButtonContent>
      </AccordionButton>
      <AccordionContent isOpen={open} aria-labelledby={`label-${id}`} id={id}>
        {children}
      </AccordionContent>
    </>
  );
}

export default Accordion;
