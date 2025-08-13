import { EditLabelsModal, Main, Navbar, NoteModal, Sidebar } from '@/components';
import { useActions, useActiveNoteId, useUi } from '@/store';

const App = () => {
  const { isEditLabelsMenuOpen } = useUi();
  const activeNoteId = useActiveNoteId();
  const { ui } = useActions();

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Main />
      </div>
      {isEditLabelsMenuOpen && <EditLabelsModal onClose={() => ui.setEditLabelsMenuOpen(false)} />}
      {activeNoteId && <NoteModal />}
    </div>
  );
};

export default App;
