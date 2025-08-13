import { EditLabelsModal, Main, Navbar, Sidebar } from '@/components';
import { useActions, useUi } from '@/store';

const App = () => {
  const { isEditLabelsMenuOpen } = useUi();
  const { ui } = useActions();

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Main />
      </div>
      {isEditLabelsMenuOpen && <EditLabelsModal onClose={() => ui.setEditLabelsMenuOpen(false)} />}
    </div>
  );
};

export default App;
