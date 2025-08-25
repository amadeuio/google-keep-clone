import { useNoteHeights } from '@/store';

interface NoteGridConfig {
  noteWidth: number;
  gap: number;
  columns: number;
}

interface NotePosition {
  top: number;
  left: number;
}

const GRID_CONFIG: NoteGridConfig = {
  noteWidth: 237,
  gap: 10,
  columns: 3,
};

export const useNotePosition = () => {
  const noteHeights = useNoteHeights();

  const getNoteCoordinates = (index: number, columns: number) => ({
    column: index % columns,
    row: Math.floor(index / columns),
  });

  const getNoteIndex = (row: number, column: number, columns: number): number =>
    row * columns + column;

  const getTotalHeightAbove = (index: number, columns: number, gap: number): number => {
    const { row, column } = getNoteCoordinates(index, columns);
    return Array.from(
      { length: row },
      (_, i) => noteHeights[getNoteIndex(i, column, columns)] || 0,
    ).reduce((sum, height) => sum + height + gap, 0);
  };

  const getPosition = (index: number): NotePosition => {
    const { noteWidth, gap, columns } = GRID_CONFIG;
    const { column } = getNoteCoordinates(index, columns);

    return {
      top: getTotalHeightAbove(index, columns, gap),
      left: column * (noteWidth + gap),
    };
  };

  return { getPosition };
};
