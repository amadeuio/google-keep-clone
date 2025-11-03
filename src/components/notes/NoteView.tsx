import { IconButton } from '@/components';
import { useNotePosition } from '@/hooks';
import { useActions, useIsNoteActive, useSearch } from '@/store';
import type { DisplayNote } from '@/types';
import { cn } from '@/utils';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Label, NoteToolbar, TextView } from './';

interface NoteGhostProps {
  note: DisplayNote;
  translate: { x: number; y: number };
  initialPosition: { x: number; y: number };
}

const NoteGhost = ({ note, translate, initialPosition }: NoteGhostProps) => {
  return (
    <div
      className={cn(
        'w-note-compact absolute z-50 flex cursor-move flex-col gap-4 rounded-lg border px-4.5 pt-4.5 pb-14 opacity-70 shadow-lg select-none',
      )}
      style={{
        transform: `translate(${initialPosition.x + translate.x}px, ${initialPosition.y + translate.y}px)`,
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
  const [ghostTranslate, setGhostTranslate] = useState({ x: 0, y: 0 });
  const [isDragSession, setIsDragSession] = useState(false);

  const dragStartRef = useRef<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const noteRef = useRef<HTMLDivElement>(null);

  // Initialises refs and state for drag session
  const handleMouseDown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="button"]')) {
      return;
    }

    if (noteRef.current) {
      dragStartRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
      };
      isDraggingRef.current = false;
      setIsDragSession(true);
    }
  };

  useEffect(() => {
    if (!isDragSession) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!dragStartRef.current) return;

      // deltaX, deltaY: distance moved since mouse down
      const deltaX = e.clientX - dragStartRef.current.mouseX;
      const deltaY = e.clientY - dragStartRef.current.mouseY;
      const dragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Start dragging if moved more than 3px
      if (!isDraggingRef.current && dragDistance > 3) {
        isDraggingRef.current = true;
        setIsDragging(true);
      }

      // Update ghost position if dragging
      if (isDraggingRef.current) {
        setGhostTranslate({
          x: deltaX,
          y: deltaY,
        });
      }
    };

    const handleMouseUp = () => {
      dragStartRef.current = null;
      isDraggingRef.current = false;
      setIsDragSession(false);
      setIsDragging(false);
      setGhostTranslate({ x: 0, y: 0 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragSession]);

  const handleClick = (e: MouseEvent) => {
    // Don't open note if we just finished dragging
    if (isDragging) {
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
          transform: `translate(${initialPosition.x}px, ${initialPosition.y}px)`,
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
      {isDragging && (
        <NoteGhost note={note} translate={ghostTranslate} initialPosition={initialPosition} />
      )}
    </>
  );
};

export default NoteView;
