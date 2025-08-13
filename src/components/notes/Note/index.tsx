import { Label } from '@/components';
import type { DisplayNote } from '@/types';
import NoteToolbar from './NoteToolbar';

interface NoteProps {
  note: DisplayNote;
}

const Note = ({ note }: NoteProps) => (
  <div className="bg-base flex flex-col gap-6 rounded-lg border p-6">
    <div className="font-semibold">{note.title}</div>
    <div>{note.content}</div>
    <div className="flex gap-2">
      {note.labels.map((label) => (
        <Label key={label.id} label={label} />
      ))}
    </div>
    <NoteToolbar note={note} />
  </div>
);

export default Note;
