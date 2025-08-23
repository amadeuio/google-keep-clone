import HighlightedText from './HighlightedText';

interface ViewOnlyTextProps {
  value: string;
  searchTerm: string;
  isTitle?: boolean;
  className?: string;
}

const ViewOnlyText = ({ value, searchTerm, className }: ViewOnlyTextProps) => (
  <div className={className}>
    {searchTerm && searchTerm.trim() ? (
      <HighlightedText value={value} searchTerm={searchTerm} />
    ) : (
      <>{value}</>
    )}
  </div>
);

export default ViewOnlyText;
