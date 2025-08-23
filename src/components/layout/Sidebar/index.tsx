import { useActions, useLabels, useView } from '@/store';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const labels = useLabels();
  const view = useView();
  const { filters, ui } = useActions();

  return (
    <aside className="flex h-full w-full max-w-70 flex-col py-2">
      <SidebarItem
        title="Notes"
        url="#"
        iconName="lightbulb_2"
        onClick={() => filters.set({ view: { type: 'notes' } })}
        isActive={view.type === 'notes'}
      />
      {labels.map((label) => (
        <SidebarItem
          key={label.id}
          title={label.name}
          url="#"
          iconName="label"
          onClick={() => filters.set({ view: { type: 'label', id: label.id } })}
          isActive={view.type === 'label' && view.id === label.id}
        />
      ))}
      <SidebarItem
        title="Edit labels"
        url="#"
        iconName="edit"
        onClick={() => ui.setEditLabelsMenuOpen(true)}
      />
      <SidebarItem
        title="Archive"
        url="#"
        iconName="archive"
        onClick={() => filters.set({ view: { type: 'archive' } })}
        isActive={view.type === 'archive'}
      />
      <SidebarItem
        title="Trash"
        url="#"
        iconName="delete"
        onClick={() => filters.set({ view: { type: 'trash' } })}
        isActive={view.type === 'trash'}
      />
    </aside>
  );
};

export default Sidebar;
