import { Icon, IconButton } from '@/components';
import { useActions, useFilteredLabels } from '@/store';
import { useState } from 'react';

const SearchInput = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <div className="flex items-center gap-x-2">
    <input
      type="text"
      placeholder="Enter label name"
      className="w-full border-none py-2 text-white outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Icon name="search" size={14} className="text-neutral-400" />
  </div>
);

const CreateLabel = ({ name, onClick }: { name: string; onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-x-2 py-2 whitespace-nowrap text-white hover:bg-neutral-600"
    >
      <Icon name="add" />
      Create '{name}'
    </div>
  );
};

const MenuItem = ({ label, onDelete }: { label: string; onDelete: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [labelName, setLabelName] = useState(label);

  return (
    <div
      onClick={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
      className="flex cursor-text justify-between text-white"
    >
      <div className="flex items-center gap-x-4 pl-2">
        <Icon name="label" size={16} />
        {isEditing ? (
          <input
            autoFocus
            type="text"
            className="border-none bg-transparent py-2 text-white outline-none focus:shadow-[0_1px_0_0_oklch(55.6%_0_0)]"
            value={labelName}
            onChange={(e) => setLabelName(e.target.value)}
          />
        ) : (
          <span>{labelName}</span>
        )}
      </div>
      <div className="flex items-center">
        <IconButton
          className="size-9.5"
          iconName={isEditing ? 'check' : 'edit'}
          label={isEditing ? 'Save' : 'Edit'}
        />
        <IconButton iconName="delete" label="Delete" onClick={onDelete} />
      </div>
    </div>
  );
};

const EditLabelsMenu = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const filteredLabels = useFilteredLabels(name);
  const { createLabel, setIsEditLabelsMenuOpen } = useActions();

  const handleCreateLabel = () => {
    createLabel(name);
    setName('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-96 rounded-lg bg-neutral-700 p-4 shadow-[0.5px_0.5px_6px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center justify-between border-b border-neutral-600 px-6 pb-4">
          <span className="text-lg">Edit labels</span>
        </div>
        <div className="space-y-2">
          {filteredLabels.length > 0 ? (
            filteredLabels.map((label) => (
              <MenuItem key={label} label={label} onDelete={() => {}} />
            ))
          ) : (
            <CreateLabel name={name} onClick={handleCreateLabel} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditLabelsMenu;
