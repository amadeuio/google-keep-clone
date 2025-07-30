import { IconButton, Menu } from '@/components';

interface ToolbarItemType {
  id: string;
  label: string;
  iconName: string;
  onClick?: () => void;
  menuItems?: {
    label: string;
    onClick: () => void;
  }[];
}

const ToolbarItem = ({ label, iconName, onClick, menuItems }: ToolbarItemType) =>
  menuItems ? (
    <Menu items={menuItems}>
      <IconButton label={label} iconName={iconName} />
    </Menu>
  ) : (
    <IconButton label={label} iconName={iconName} onClick={onClick} />
  );

const toolbarItems = [
  {
    id: 'background-options',
    label: 'Background options',
    iconName: 'palette',
    onClick: () => {},
  },
  {
    id: 'archive',
    label: 'Archive',
    iconName: 'archive',
    onClick: () => {},
  },
  {
    id: 'more',
    label: 'More',
    iconName: 'more_vert',
    onClick: () => {},
    menuItems: [
      {
        label: 'Delete note',
        onClick: () => {},
      },
      {
        label: 'Add label',
        onClick: () => {},
      },
      {
        label: 'Make a copy',
        onClick: () => {},
      },
    ],
  },
];

interface ToolbarProps {}

const Toolbar = ({}: ToolbarProps) => {
  return (
    <div className="flex items-center gap-x-2">
      {toolbarItems.map((item) => (
        <ToolbarItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
