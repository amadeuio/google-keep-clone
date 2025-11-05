import { useActions, useActiveNoteId } from '@/store';
import { useLayoutEffect, type RefObject } from 'react';

interface UseUpdateNoteHeightProps {
  noteId: string;
  noteHeight: number | null;
  noteRef: RefObject<HTMLDivElement | null>;
}

export const useUpdateNoteHeight = ({ noteId, noteHeight, noteRef }: UseUpdateNoteHeightProps) => {
  const { notes } = useActions();
  const activeNoteId = useActiveNoteId();

  const updateNoteHeight = (noteId: string) => {
    if (noteRef.current) {
      requestAnimationFrame(() => {
        if (noteRef.current) {
          const height = noteRef.current.offsetHeight;

          if (noteHeight !== height) {
            notes.updateHeight(noteId, height);
          }
        }
      });
    }
  };

  useLayoutEffect(() => {
    if (activeNoteId) return;
    updateNoteHeight(noteId);
  }, [activeNoteId]);
};
