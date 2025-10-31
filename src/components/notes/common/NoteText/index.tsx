import { cn } from '@/utils';
import EditableText from './EditableText';
import ViewOnlyText from './ViewOnlyText';

interface NoteTextProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  className?: string;
  isTitle?: boolean;
  isViewOnly?: boolean;
  searchTerm?: string;
}

const NoteText = ({
  value,
  onChange,
  placeholder,
  className,
  isTitle,
  onFocus,
  searchTerm,
  isViewOnly = false,
}: NoteTextProps) => {
  const combinedClassName = cn(
    'resize-none text-[14.3px] tracking-[-0.2px] leading-relaxed outline-none placeholder:text-neutral-400 placeholder:font-medium',
    isTitle && 'text-xl leading-tight placeholder:text-xl',
    className,
  );

  return isViewOnly ? (
    <ViewOnlyText value={value} searchTerm={searchTerm ?? ''} className={combinedClassName} />
  ) : (
    <EditableText
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={combinedClassName}
      onFocus={onFocus}
    />
  );
};

export default NoteText;
