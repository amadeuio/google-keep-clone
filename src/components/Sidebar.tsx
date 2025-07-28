import { MdArchive, MdDelete, MdEdit, MdOutlineNotes } from 'react-icons/md';

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

const Sidebar = () => {
  return (
    <aside className="flex h-full w-full max-w-70 flex-col gap-6 p-6">
      {items.map((item) => (
        <a key={item.title} href={item.url} className="flex items-center gap-x-2">
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </a>
      ))}
    </aside>
  );
};

export default Sidebar;
