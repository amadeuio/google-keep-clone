import { Button, Icon, Menu, Tooltip } from '@/components';

interface ToolbarItemProps {
  label: string;
  iconName: string;
}

const ToolbarItem = ({ iconName, label }: ToolbarItemProps) => (
  <Tooltip content={label}>
    <Button className="rounded-full">
      <Icon size={16} name={iconName} />
    </Button>
  </Tooltip>
);

const toolbarItems = [
  {
    label: 'Background options',
    iconName: 'palette',
  },
  {
    label: 'Archive',
    iconName: 'archive',
  },
];

const menuItems = [
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
];

interface ToolbarProps {}

const Toolbar = ({}: ToolbarProps) => {
  return (
    <div className="flex items-center gap-x-2">
      {toolbarItems.map((item) => (
        <ToolbarItem key={item.label} {...item} />
      ))}
      <Menu items={menuItems}>
        <ToolbarItem iconName="more_vert" label="More" />
      </Menu>
    </div>
  );
};

export default Toolbar;
