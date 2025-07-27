import { Note } from '@/components';
import { notes } from '@/data';

const App = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
};

export default App;
