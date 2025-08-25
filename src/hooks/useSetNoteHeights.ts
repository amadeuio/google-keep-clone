import { useActions } from '@/store';
import { useLayoutEffect, useRef } from 'react';

export const useSetNoteHeights = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { noteHeights } = useActions();

  useLayoutEffect(() => {
    if (ref.current) {
      noteHeights.add(ref.current.offsetHeight);
    }
  }, []);

  return { ref };
};
