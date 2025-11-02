import { IconButton } from '@/components';
import { useNotePosition } from '@/hooks';
import { useActions, useIsNoteActive, useSearch } from '@/store';
import type { DisplayNote } from '@/types';
import { cn } from '@/utils';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Label, NoteToolbar, TextView } from './';

interface NoteGhostProps {
  note: DisplayNote;
  position: { x: number; y: number };
}

const NoteGhost = ({ note, position }: NoteGhostProps) => {
  return (
    <div
      className={cn(
        'w-note-compact fixed z-50 flex cursor-move flex-col gap-4 rounded-lg border px-4.5 pt-4.5 pb-14 opacity-70 shadow-lg select-none',
      )}
      style={{
        left: position.x,
        top: position.y,
        backgroundColor: note.colorValue ?? 'var(--color-base)',
        borderColor: note.colorValue ?? 'var(--color-secondary)',
      }}
    >
      <TextView isTitle value={note.title} searchTerm={''} />
      <TextView value={note.content} searchTerm={''} />
    </div>
  );
};

interface NoteViewProps {
  note: DisplayNote;
}

const NoteView = ({ note }: NoteViewProps) => {
  const { activeNote } = useActions();
  const isActive = useIsNoteActive(note.id);
  const { notes } = useActions();
  const search = useSearch();
  const { getPosition } = useNotePosition();
  const initialPosition = getPosition(note.id);

  const [isDragging, setIsDragging] = useState(false);
  const [ghostPosition, setGhostPosition] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0, noteX: 0, noteY: 0 });
  const noteRef = useRef<HTMLDivElement>(null);
  const hasDragged = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent drag on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="button"]')) {
      return;
    }

    if (noteRef.current) {
      const rect = noteRef.current.getBoundingClientRect();
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        noteX: rect.left,
        noteY: rect.top,
      };
      setGhostPosition({ x: rect.left, y: rect.top });
      hasDragged.current = false;
      setIsDragging(true);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;

      // Consider it a drag if moved more than 3px
      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        hasDragged.current = true;
      }

      setGhostPosition({
        x: dragStartRef.current.noteX + deltaX,
        y: dragStartRef.current.noteY + deltaY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleClick = (e: MouseEvent) => {
    // Don't open note if we just finished dragging
    if (hasDragged.current) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    activeNote.set({
      id: note.id,
      position: {
        top: rect.top,
        left: rect.left,
      },
    });
  };

  return (
    <>
      <div
        ref={noteRef}
        className={cn(
          'group/note hover:shadow-base w-note-compact absolute flex flex-col gap-4 rounded-lg border px-4.5 pt-4.5 pb-14 transition-colors duration-800 ease-in-out select-none',
          isDragging && 'opacity-0',
          isActive && 'opacity-0',
        )}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        style={{
          backgroundColor: note.colorValue ?? 'var(--color-base)',
          borderColor: note.colorValue ?? 'var(--color-secondary)',
          transform: `translate(${initialPosition.left}px, ${initialPosition.top}px)`,
          transition: 'transform 0.3s ease-in-out',
          willChange: 'transform',
        }}
      >
        <IconButton
          size={24}
          iconName="push_pin"
          label={note.isPinned ? 'Unpin note' : 'Pin note'}
          filled={note.isPinned}
          className="absolute top-2 right-2 p-1 opacity-0 transition-opacity duration-400 ease-in-out group-hover/note:opacity-100"
          iconClassName="text-neutral-300"
          onClick={() => notes.togglePin(note.id)}
        />
        {note.title && <TextView isTitle value={note.title} searchTerm={search} />}
        <TextView value={note.content} searchTerm={search} />
        <div className="flex flex-wrap gap-1.5">
          {note.labels.map((label) => (
            <Label
              key={label.id}
              label={label}
              onClose={() => notes.removeLabel(note.id, label.id)}
            />
          ))}
        </div>
        <NoteToolbar
          note={note}
          className="absolute bottom-1.5 left-1.5 opacity-0 transition-opacity duration-400 ease-in-out group-hover/note:opacity-100"
        />
      </div>
      {isDragging && <NoteGhost note={note} position={ghostPosition} />}
    </>
  );
};

export default NoteView;
