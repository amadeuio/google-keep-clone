import { IconButton } from '@/components';
import { useStore } from '@/store';
import { selectActions } from '@/store/selectors';
import { cn } from '@/utils';
import { useState } from 'react';
import LabelInput from './LabelInput';

const CreateLabel = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const { labels } = useStore(selectActions);

  const handleSave = () => {
    if (name.trim()) {
      labels.create(name.trim());
      setName('');
      setIsEditing(false);
    }
  };

  return (
    <div className="flex cursor-text justify-between text-white">
      <div className="flex items-center gap-x-2">
        {isEditing ? (
          <IconButton
            iconName="close"
            label="Label"
            size={18}
            onClick={() => {
              setIsEditing(false);
              setName('');
            }}
          />
        ) : (
          <IconButton
            iconName="add"
            label="Label"
            size={18}
            onClick={() => {
              setIsEditing(true);
            }}
          />
        )}
        <LabelInput
          value={name}
          onChange={setName}
          onClick={() => setIsEditing(true)}
          placeholder="Enter label name"
        />
      </div>
      <IconButton
        className={cn('size-9.5 opacity-0', isEditing && 'opacity-100')}
        iconName="check"
        label="Save"
        size={18}
        onClick={handleSave}
      />
    </div>
  );
};

export default CreateLabel;
