import { Note, NoteCreate } from '@/components';
import { useDisplayNotes } from '@/store';

const Main = () => {
  const notes = useDisplayNotes();

  return (
    <main className="flex w-full flex-col items-center gap-20 p-4 py-8">
      <NoteCreate />
      <div className="grid w-full grid-cols-[repeat(3,auto)] justify-start gap-4">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </main>
  );
};

export default Main;
