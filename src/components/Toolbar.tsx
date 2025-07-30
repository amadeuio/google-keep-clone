import { IconButton, EditLabelMenu } from '@/components';
import { useState } from 'react';

interface ToolbarItemProps {
  toolbarItem: ToolbarItemType;
}
interface ToolbarItemType {
  id: string;
  label: string;
  iconName: string;
  onClick?: () => void;
}

interface MenuItemType {
  label: string;
  onClick: () => void;
}

const ToolbarItem = ({ toolbarItem }: ToolbarItemProps) => (
  <IconButton
    label={toolbarItem.label}
    iconName={toolbarItem.iconName}
    onClick={toolbarItem.onClick}
  />
);

interface ToolbarProps {}

const Toolbar = ({}: ToolbarProps) => {
  const [isAddLabelMenuVisible, setIsAddLabelMenuVisible] = useState(false);

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
    },
  ];

  const moreMenuItems = [
    {
      label: 'Delete note',
      onClick: () => {},
    },
    {
      label: 'Add label',
      onClick: () => setIsAddLabelMenuVisible(true),
    },
    {
      label: 'Make a copy',
      onClick: () => {},
    },
  ];

  return (
    <div className="flex items-center gap-x-2">
      {toolbarItems.map((item) =>
        item.id === 'more' ? (
          <EditLabelMenu items={moreMenuItems}>
            <ToolbarItem key={item.id} toolbarItem={item} />
          </EditLabelMenu>
        ) : (
          <ToolbarItem key={item.id} toolbarItem={item} />
        ),
      )}
    </div>
  );
};

export default Toolbar;
