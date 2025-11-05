import { useActions } from '@/store';
import type { DisplayNote } from '@/types';
import { useEffect, type RefObject } from 'react';

interface UseNoteHeightParams {
  note: DisplayNote;
  nodeRef: RefObject<HTMLDivElement | null>;
}

export const useNoteHeight = ({ note, nodeRef }: UseNoteHeightParams) => {
  const { notes } = useActions();

  useEffect(() => {
    if (nodeRef.current) {
      requestAnimationFrame(() => {
        if (nodeRef.current) {
          const height = nodeRef.current.offsetHeight;
          if (note.height !== height) {
            notes.updateHeight(note.id, height);
          }
        }
      });
    }
  }, [nodeRef]);
};
