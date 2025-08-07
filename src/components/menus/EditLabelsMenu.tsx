import { IconButton } from '@/components';
import { useLabels } from '@/store';
import { cn } from '@/utils';
import { useState } from 'react';

interface EditableInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isEditing?: boolean;
  className?: string;
  autoFocus?: boolean;
  onBlur?: () => void;
}

const EditableInput = ({
  value,
  onChange,
  placeholder,
  isEditing = false,
  className,
  autoFocus,
  onBlur,
}: EditableInputProps) => (
  <input
    autoFocus={autoFocus}
    type="text"
    placeholder={placeholder}
    className={cn(
      'border-none bg-transparent text-white outline-none',
      isEditing && 'focus:shadow-[0_1px_0_0_oklch(55.6%_0_0)]',
      className,
    )}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onBlur={onBlur}
  />
);

const CreateLabel = ({ label, onCreate }: { label: string; onCreate: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [labelName, setLabelName] = useState(label);

  return (
    <div
      onClick={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
      className="flex cursor-text justify-between text-white"
    >
      <div className="flex items-center gap-x-2">
        {isEditing ? (
          <IconButton
            iconName="close"
            label="Label"
            onClick={() => {
              setIsEditing(false);
              setLabelName('');
            }}
          />
        ) : (
          <IconButton iconName="add" label="Label" onClick={() => setIsEditing(true)} />
        )}
        <EditableInput
          value={labelName}
          onChange={setLabelName}
          placeholder="Enter label name"
          isEditing={isEditing}
          autoFocus
          onBlur={() => setIsEditing(false)}
        />
      </div>
      <IconButton
        className={cn('-mr-3 size-9.5 opacity-0', isEditing && 'opacity-100')}
        iconName="check"
        label="Save"
        onClick={onCreate}
      />
    </div>
  );
};

const EditLabel = ({ label, onDelete }: { label: string; onDelete: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [labelName, setLabelName] = useState(label);

  return (
    <div
      onClick={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
      className="flex cursor-text justify-between text-white"
    >
      <div className="flex items-center gap-x-2">
        <IconButton iconName="label" label="Label" />
        <EditableInput
          value={labelName}
          onChange={setLabelName}
          placeholder="Enter label name"
          isEditing={isEditing}
          autoFocus
        />
      </div>
      <div className="-mr-3 flex items-center">
        {isEditing ? (
          <IconButton className="size-9.5" iconName="check" label="Save" />
        ) : (
          <IconButton className="size-9.5" iconName="edit" label="Edit" />
        )}
        <IconButton iconName="delete" label="Delete" onClick={onDelete} />
      </div>
    </div>
  );
};

const EditLabelsMenu = ({ onClose }: { onClose: () => void }) => {
  const labels = useLabels();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-96 flex-col gap-y-4 rounded-lg bg-neutral-700 px-6 py-4 shadow-[0.5px_0.5px_6px_rgba(0,0,0,0.6)]"
      >
        <span className="text-lg">Edit labels</span>
        <div className="space-y-2">
          <CreateLabel label="Create new label" onCreate={() => {}} />
          {labels.map((label) => (
            <EditLabel key={label} label={label} onDelete={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditLabelsMenu;
