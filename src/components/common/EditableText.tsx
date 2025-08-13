import { cn } from '@/utils';
import type { FocusEvent, KeyboardEvent } from 'react';

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

  return (
    <div
      className={cn('outline-none', className)}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      data-placeholder={placeholder}
    >
      {value}
    </div>
  );
};

export default EditableText;
