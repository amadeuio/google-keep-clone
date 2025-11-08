import { NoteCreate, NoteView } from '@/components';
import { useResponsiveGrid } from '@/hooks';
import { useStore } from '@/store';
import { selectDisplayNotes, selectNotesTotalWidth } from '@/store/selectors';
import { useRef } from 'react';
import EmptyState from './EmptyState';

const Main = () => {
  const notes = useStore(selectDisplayNotes);
  const notesTotalWidth = useStore(selectNotesTotalWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  useResponsiveGrid(containerRef);

  return (
    <main className="flex flex-1 flex-col items-center gap-20 overflow-y-auto px-2 py-12">
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
