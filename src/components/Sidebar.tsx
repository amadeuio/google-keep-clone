import { useActions, useLabels } from '@/store';
import { MdArchive, MdDelete, MdEdit, MdLabel, MdOutlineNotes } from 'react-icons/md';

const items = [
  {
    title: 'Notes',
    url: '#',
    icon: MdOutlineNotes,
  },
  {
    title: 'Edit labels',
    url: '#',
    icon: MdEdit,
  },
  {
    title: 'Archive',
    url: '#',
    icon: MdArchive,
  },
  {
    title: 'Trash',
    url: '#',
    icon: MdDelete,
  },
];

const SidebarItem = ({
  title,
  url,
  icon: Icon,
  onClick,
}: {
  title: string;
  url: string;
  icon: React.ElementType;
  onClick?: () => void;
}) => (
  <a href={url} className="flex items-center gap-x-2" onClick={onClick}>
    <Icon className="h-4 w-4" />
    <span>{title}</span>
  </a>
);

const Sidebar = () => {
  const labels = useLabels();
  const { setFilters } = useActions();

  return (
    <aside className="flex h-full w-full max-w-70 flex-col gap-6 p-6">
      <SidebarItem
        title="Notes"
        url="#"
        icon={MdOutlineNotes}
        onClick={() => setFilters({ label: null })}
      />
      {labels.map((label) => (
        <SidebarItem
          key={label}
          title={label}
          url="#"
          icon={MdLabel}
          onClick={() => setFilters({ label })}
        />
      ))}
      <SidebarItem title="Edit labels" url="#" icon={MdEdit} />
      <SidebarItem title="Archive" url="#" icon={MdArchive} />
      <SidebarItem title="Trash" url="#" icon={MdDelete} />
    </aside>
  );
};

export default Sidebar;
