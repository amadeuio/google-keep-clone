interface HighlightedTextProps {
  value: string;
  searchTerm: string;
}

const HighlightedText = ({ value, searchTerm }: HighlightedTextProps) => {
  const parts = value.split(new RegExp(`(${searchTerm})`, 'gi'));

  return parts.map((part, i) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <mark key={i} className="rounded-sm bg-yellow-200">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
};

export default HighlightedText;
