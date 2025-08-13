import { Menu, MenuTrigger } from '@/components';
import type { DisplayNote } from '@/types';
import { useState, type ReactNode } from 'react';
import LabelNoteMenu from './LabelNoteMenu';

interface MoreMenuProps {
  children: ReactNode;
  note: DisplayNote;
}

const MoreMenu = ({ children, note }: MoreMenuProps) => {
  const [isEditLabel, setIsEditLabel] = useState(false);

  const moreMenuItems = [
    {
      label: 'Delete note',
      action: () => {},
    },
    {
      label: note.labels.length > 0 ? 'Change labels' : 'Add label',
      action: () => setIsEditLabel(true),
    },
  ];

  return (
    <MenuTrigger
      menu={isEditLabel ? <LabelNoteMenu note={note} /> : <Menu items={moreMenuItems} />}
      onClickOutside={() => setIsEditLabel(false)}
    >
      {children}
    </MenuTrigger>
  );
};

export default MoreMenu;
