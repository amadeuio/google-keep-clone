import { useNotePosition, useSetNoteHeights } from '@/hooks';
import { useActions, useIsNoteActive } from '@/store';
import type { DisplayNote } from '@/types';
import { cn } from '@/utils';
import type { MouseEvent } from 'react';
import { Draggable } from '../common';
import { NoteBase } from './common';

interface NoteProps {
  note: DisplayNote;
  className?: string;
  index: number;
}

const Note = ({ note, className, index }: NoteProps) => {
  const { activeNote } = useActions();
  const isActive = useIsNoteActive(note.id);
  const { ref } = useSetNoteHeights();
  const { getPosition } = useNotePosition();

  const handleClick = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    activeNote.set({
      id: note.id,
      position: {
        top: rect.top,
        left: rect.left,
      },
    });
  };

  const handleDragEnd = (x: number, y: number) => {
    console.debug(`Note ${note.id} dropped at: ${x}, ${y}`);
  };

  return (
    <Draggable
      onDragEnd={handleDragEnd}
      className={cn('hover:shadow-base w-note-compact', isActive && 'opacity-0', className)}
    >
      <NoteBase
        ref={ref}
        isViewOnly
        note={note}
        onClick={handleClick}
        className={cn(
          'hover:shadow-base w-note-compact absolute',
          isActive && 'opacity-0',
          className,
        )}
        style={{
          transform: `translate(${getPosition(index).left}px, ${getPosition(index).top}px)`,
          willChange: 'transform',
        }}
      />
    </Draggable>
  );
};

export default Note;
