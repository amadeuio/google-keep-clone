import { Menu } from '@/components';
import { useStore } from '@/store';
import { selectActions } from '@/store/selectors';
import type { DisplayNote } from '@/types';
import { useState } from 'react';
import { EditLabelsMenu } from '.';

interface MoreMenuProps {
  note: DisplayNote;
}

const MoreMenu = ({ note }: MoreMenuProps) => {
  const [isEditLabel, setIsEditLabel] = useState(false);
  const { notes } = useStore(selectActions);

  return isEditLabel ? (
    <EditLabelsMenu note={note} />
  ) : (
    <Menu
      items={[
        {
          label: 'Delete note',
          action: () => notes.trash(note.id),
        },
        {
          label: note.labels.length > 0 ? 'Change labels' : 'Add label',
          action: () => setIsEditLabel(true),
        },
      ]}
    />
  );
};

export default MoreMenu;
