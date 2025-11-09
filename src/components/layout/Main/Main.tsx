import { NoteCreate, NoteView } from '@/components';
import { useSetGridColumns } from '@/hooks';
import { useStore } from '@/store';
import { selectDisplayNotes, selectNotesTotalWidth } from '@/store/selectors';
import { useRef } from 'react';
import EmptyState from './EmptyState';

const Main = () => {
  const notes = useStore(selectDisplayNotes);
  const notesTotalWidth = useStore(selectNotesTotalWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  useSetGridColumns(containerRef);

  return (
    <main className="flex flex-1 flex-col items-center gap-12 overflow-y-auto p-4 md:gap-20 md:px-2 md:py-12">
      <NoteCreate />
      {notes.length === 0 ? (
        <EmptyState />
      ) : (
        <div ref={containerRef} className="w-full">
          <div className="relative mx-auto" style={{ width: notesTotalWidth }}>
            {notes.map((note) => (
              <NoteView key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Main;
