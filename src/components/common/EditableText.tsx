import { cn } from '@/utils';
import { useState, type FocusEvent, type FormEvent, type KeyboardEvent } from 'react';

interface EditableTextProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
}

const EditableText = ({
  value,
  onSave,
  className = '',
  placeholder = '',
  multiline = false,
}: EditableTextProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.textContent || '';
    if (newValue !== value) {
      onSave(newValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !multiline) {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    const currentValue = e.currentTarget.textContent || '';
    setCurrentValue(currentValue);
  };

  return (
    <div className="relative">
      <div
        className={cn('relative outline-none', className)}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      >
        {value}
      </div>
      {!currentValue && placeholder && (
        <div className="pointer-events-none absolute top-0 left-0 text-gray-400 select-none">
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default EditableText;
