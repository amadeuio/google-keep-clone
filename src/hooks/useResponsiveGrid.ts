import { useStore } from '@/store';
import { selectActions } from '@/store/selectors';
import { calculateColumns } from '@/utils';
import { useLayoutEffect, type RefObject } from 'react';

export const useResponsiveGrid = (containerRef: RefObject<HTMLElement | null>) => {
  const { ui } = useStore(selectActions);

  useLayoutEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const newColumns = calculateColumns(containerWidth);

      ui.setGridColumns(newColumns);
    };

    updateColumns();

    const resizeObserver = new ResizeObserver(updateColumns);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [containerRef, ui]);
};
