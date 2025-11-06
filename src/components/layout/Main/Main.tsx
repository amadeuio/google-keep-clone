import { NoteCreate, NoteView } from '@/components';
import { useStore } from '@/store';
import { selectDisplayNotes } from '@/store/selectors';
import EmptyState from './EmptyState';

const Main = () => {
  const notes = useStore(selectDisplayNotes);

  return (
    <main className="flex w-full flex-col items-center gap-20 p-4 py-8">
      <NoteCreate />
      {notes.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="relative w-full">
          {notes.map((note) => (
            <NoteView key={note.id} note={note} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Main;
