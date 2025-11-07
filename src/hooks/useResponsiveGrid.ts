import { useStore } from '@/store';
import { selectActions } from '@/store/selectors';
import { useLayoutEffect, type RefObject } from 'react';

export const useResponsiveGrid = (containerRef: RefObject<HTMLElement | null>) => {
  const { ui } = useStore(selectActions);

  useLayoutEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      ui.setGridColumnsFromWidth(containerWidth);
    };

    updateColumns();

    const resizeObserver = new ResizeObserver(updateColumns);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [containerRef, ui]);
};
