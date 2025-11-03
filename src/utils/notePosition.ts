import { GRID_CONFIG } from '@/constants/grid';

export const getPositionFromNoteId = (
  noteId: string,
  notesOrder: string[],
): { y: number; x: number } => {
  const { noteWidth, noteHeight, gap, columns } = GRID_CONFIG;
  const orderIndex = notesOrder.indexOf(noteId);
  const column = orderIndex % columns;
  const row = Math.floor(orderIndex / columns);

  return {
    y: row * (noteHeight + gap),
    x: column * (noteWidth + gap),
  };
};

export const getNoteIdFromPosition = (
  y: number,
  x: number,
  notesOrder: string[],
): string | undefined => {
  const { noteWidth, noteHeight, gap, columns } = GRID_CONFIG;

  const col = Math.floor(x / (noteWidth + gap));
  const row = Math.floor(y / (noteHeight + gap));

  const gridIndex = row * columns + col;
  return notesOrder[gridIndex];
};
