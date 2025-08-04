import { Icon } from '@/components';

interface EditLabelMenuItemType {
  label: string;
  checked?: boolean;
  onClick: () => void;
}

const Checkbox = ({ checked }: { checked: boolean }) => (
  <div className="relative size-[12px] rounded-xs border border-neutral-300">
    {checked && (
      <Icon name="check" size={13} className="absolute top-0 -left-[1px] text-neutral-300" />
    )}
  </div>
);

const MenuItem = ({ label, onClick }: EditLabelMenuItemType) => (
  <div
    onClick={onClick}
    className="flex cursor-pointer items-center gap-x-4 px-6 py-2 whitespace-nowrap text-white hover:bg-neutral-600"
  >
    <Checkbox checked={true} />
    {label}
  </div>
);

const EditLabelMenu = ({ items }: { items: EditLabelMenuItemType[] }) => (
  <div className="absolute top-full left-0 z-10 rounded-sm bg-neutral-700 py-2 shadow-[0.5px_0.5px_6px_rgba(0,0,0,0.6)]">
    <div className="px-6 py-2">Label note</div>
    <div className="relative px-6">
      <input
        type="text"
        placeholder="Enter label name"
        className="w-full border-neutral-500 px-6 py-2 pr-8 text-white"
      />
      <Icon
        name="search"
        size={16}
        className="absolute top-1/2 right-8 -translate-y-1/2 text-neutral-400"
      />
    </div>
    {items.map((item) => (
      <MenuItem key={item.label} {...item} />
    ))}
  </div>
);

export default EditLabelMenu;
