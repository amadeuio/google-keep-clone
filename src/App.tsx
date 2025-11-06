import { EditLabelsModal, Main, Navbar, NoteActive, Sidebar } from '@/components';
import { useStore } from '@/store';
import { selectActions, selectActiveNoteId, selectUi } from '@/store/selectors';

const App = () => {
  const { isEditLabelsMenuOpen } = useStore(selectUi);
  const activeNoteId = useStore(selectActiveNoteId);
  const { ui } = useStore(selectActions);

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex h-full gap-x-8">
        <Sidebar />
        <Main />
      </div>
      {isEditLabelsMenuOpen && <EditLabelsModal onClose={() => ui.setEditLabelsMenuOpen(false)} />}
      {activeNoteId && <NoteActive />}
    </div>
  );
};

export default App;
