import { IconButton } from '@/components';
import { useActions } from '@/store';
import { cn } from '@/utils';
import { useState } from 'react';
import Input from './Input';

const Create = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const { labels } = useActions();

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
            onClick={() => {
              setIsEditing(false);
              setName('');
            }}
          />
        ) : (
          <IconButton
            iconName="add"
            label="Label"
            onClick={() => {
              setIsEditing(true);
            }}
          />
        )}
        <Input
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
        onClick={handleSave}
      />
    </div>
  );
};

export default Create;
