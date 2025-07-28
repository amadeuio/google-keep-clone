import type { Note as NoteType } from '@/types';
import { Drag } from '@/components/dnd';

interface NoteProps {
  note: NoteType;
}

const Note = ({ note }: NoteProps) => (
  <Drag key={note.id} id={note.id}>
    <div className="bg-base border-secondary flex flex-col gap-6 rounded-lg border p-6">
      <div className="text-lg">{note.title}</div>
      <div className="text-sm">{note.content}</div>
    </div>
  </Drag>
);

export default Note;
