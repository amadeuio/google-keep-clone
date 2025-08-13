import { Label } from '@/components';
import { useActions, useIsNoteActive } from '@/store';
import type { DisplayNote } from '@/types';
import { cn } from '@/utils';
import type { MouseEvent } from 'react';
import NoteToolbar from './NoteToolbar';

interface NoteProps {
  note: DisplayNote;
}

const Note = ({ note }: NoteProps) => {
  const { notes, activeNote } = useActions();
  const isActive = useIsNoteActive(note.id);

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

  return (
    <div
      className={cn(
        'bg-base hover:shadow-base flex w-[237px] flex-col gap-6 rounded-lg border p-6',
        isActive && 'opacity-0',
      )}
      onClick={handleClick}
    >
      <div className="font-semibold">{note.title}</div>
      <div>{note.content}</div>
      <div className="flex gap-2">
        {note.labels.map((label) => (
          <Label
            key={label.id}
            label={label}
            onClose={() => notes.removeLabel(note.id, label.id)}
          />
        ))}
      </div>
      <NoteToolbar note={note} />
    </div>
  );
};

export default Note;
