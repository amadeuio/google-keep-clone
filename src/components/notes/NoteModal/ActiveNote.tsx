import { Label } from '@/components';
import { useActions, useActiveNote, useActiveNotePosition } from '@/store';
import { useEffect, useState } from 'react';
import NoteToolbar from '../Note/NoteToolbar';

const ActiveNote = () => {
  const note = useActiveNote()!;
  const position = useActiveNotePosition();
  const { notes, activeNote } = useActions();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExpanded(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="bg-base shadow-base fixed flex flex-col gap-6 rounded-lg border p-6 transition-all duration-200 ease-in-out"
      style={{
        width: isExpanded ? '597px' : '237px',
        top: isExpanded ? '23%' : position?.top,
        left: isExpanded ? '36%' : position?.left,
      }}
      onClick={() => activeNote.set({ id: note.id, position: null })}
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

export default ActiveNote;
