import { useEffect, useRef } from 'react';

export const useClickOutside = (onClickOutside: () => void) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(onClickOutside);

  useEffect(() => {
    callbackRef.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        callbackRef.current();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return { triggerRef };
};
