import { BasicMenu, EditLabelMenu, MenuTrigger } from '@/components';
import { useState, type ReactNode } from 'react';

interface MoreMenuProps {
  children: ReactNode;
}

const MoreMenu = ({ children }: MoreMenuProps) => {
  const [isEditLabel, setIsEditLabel] = useState(false);

  const moreMenuItems = [
    {
      label: 'Delete note',
      onClick: () => {},
    },
    {
      label: 'Add label',
      onClick: () => setIsEditLabel(true),
    },
  ];

  return (
    <MenuTrigger
      menu={
        isEditLabel ? <EditLabelMenu items={moreMenuItems} /> : <BasicMenu items={moreMenuItems} />
      }
      onClose={() => setIsEditLabel(false)}
    >
      {children}
    </MenuTrigger>
  );
};

export default MoreMenu;
