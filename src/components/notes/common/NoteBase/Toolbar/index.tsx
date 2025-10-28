import { IconButton, MenuTrigger } from '@/components';
import type { DisplayNote } from '@/types';
import { cn } from '@/utils';
import MoreMenu from './MoreMenu';

const NoteToolbar = ({ note, className }: { note: DisplayNote; className?: string }) => (
  <div className={cn('flex items-center', className)}>
    <IconButton
      className="p-2"
      size={18}
      label="Background options"
      iconName="palette"
      onClick={() => {}}
    />
    <IconButton className="p-2" size={18} label="Archive" iconName="archive" onClick={() => {}} />
    <MenuTrigger menu={<MoreMenu note={note} />}>
      <IconButton className="p-2" size={18} label="More" iconName="more_vert" />
    </MenuTrigger>
  </div>
);

export default NoteToolbar;
