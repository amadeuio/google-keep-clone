import { useEffect, useState, type RefObject } from 'react';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface UseTooltipPositionProps {
  isVisible: boolean;
  tooltipRef: RefObject<HTMLElement | null>;
  wrapperRef: RefObject<HTMLElement | null>;
}

export const useTooltipPosition = ({
  isVisible,
  tooltipRef,
  wrapperRef,
}: UseTooltipPositionProps) => {
  const [position, setPosition] = useState<TooltipPosition>('bottom');

  useEffect(() => {
    if (!isVisible || !tooltipRef.current || !wrapperRef.current) return;

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newPos: typeof position = 'bottom';

    if (wrapperRect.bottom + tooltipRect.height > viewportHeight) {
      newPos = 'top';
    }

    if (wrapperRect.top - tooltipRect.height < 0) {
      newPos = 'bottom';
    }

    if (wrapperRect.left - tooltipRect.width < 0) {
      newPos = 'right';
    }
    if (wrapperRect.right + tooltipRect.width > viewportWidth) {
      newPos = 'left';
    }

    setPosition(newPos);
  }, [isVisible]);

  return position;
};
