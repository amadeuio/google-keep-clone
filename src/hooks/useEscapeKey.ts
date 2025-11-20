import { useEffect } from 'react';

interface UseEscapeKeyProps {
  onEscape: () => void;
}

export const useEscapeKey = ({ onEscape }: UseEscapeKeyProps) => {
  useEffect(() => {
    console.log('hi');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
};
