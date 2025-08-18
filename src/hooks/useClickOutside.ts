import { useEffect, useRef } from 'react';

export const useClickOutside = (onClickOutside: () => void) => {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        onClickOutside?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClickOutside]);

  return { triggerRef };
};
