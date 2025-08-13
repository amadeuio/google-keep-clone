import { useActions } from '@/store';
import ActiveNote from './ActiveNote';

const NoteModal = () => {
  const { activeNote } = useActions();

  return (
    <div
      className="fixed inset-0 z-50 bg-neutral-800/60"
      onClick={() => activeNote.set({ id: null, position: null })}
    >
      <ActiveNote />
    </div>
  );
};

export default NoteModal;
