import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Note as NoteType } from '@/types';

interface NoteProps {
  note: NoteType;
}

const Note = ({ note }: NoteProps) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{note.content}</p>
      </CardContent>
    </Card>
  );
};

export default Note;
