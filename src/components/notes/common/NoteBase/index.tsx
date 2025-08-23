import { useActions, useSearch } from '@/store';
import type { DisplayNote } from '@/types';
import { cn } from '@/utils';
import type { CSSProperties, MouseEvent } from 'react';
import { Label, NoteText } from '..';
import Toolbar from './Toolbar';

interface NoteProps {
  note: DisplayNote;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  className?: string;
  style?: CSSProperties;
  isViewOnly?: boolean;
}

const NoteBase = ({ note, onClick, className, style, isViewOnly }: NoteProps) => {
  const { notes } = useActions();
  const search = useSearch();

  return (
    <div
      className={cn('bg-base flex flex-col gap-4 rounded-lg border p-5', className)}
      onClick={onClick}
      style={style}
    >
      <NoteText
        isViewOnly={isViewOnly}
        isTitle
        searchTerm={search}
        value={note.title}
        onChange={(value: string) => notes.updateTitle(note.id, value)}
      />
      <NoteText
        isViewOnly={isViewOnly}
        searchTerm={search}
        value={note.content}
        onChange={(value: string) => notes.updateContent(note.id, value)}
      />
      <div className="flex gap-2">
        {note.labels.map((label) => (
          <Label
            key={label.id}
            label={label}
            onClose={() => notes.removeLabel(note.id, label.id)}
          />
        ))}
      </div>
      <Toolbar note={note} />
    </div>
  );
};

export default NoteBase;
