import { GRID_CONFIG } from '@/constants';
import type { Note } from '@/types';

export const getNotesTotalWidth = (gridColumns: number): number => {
  const { noteWidth, gap } = GRID_CONFIG;
  return gridColumns * noteWidth + (gridColumns - 1) * gap;
};

export const getGridColumnsFromWidth = (containerWidth: number): number => {
  const { noteWidth, gap } = GRID_CONFIG;
  return Math.max(1, Math.floor((containerWidth + gap) / (noteWidth + gap)));
};

export const getSectionHeight = (
  notesOrder: string[],
  notes: Note[],
  gridColumns: number,
): number => {
  if (notesOrder.length === 0) return 0;

  const { gap, pinnedSectionGap } = GRID_CONFIG;
  const columnHeights = new Array(gridColumns).fill(0);
  const notesById = Object.fromEntries(notes.map((n) => [n.id, n] as const));

  for (let i = 0; i < notesOrder.length; i++) {
    const noteId = notesOrder[i];
    const column = i % gridColumns;
    const note = notesById[noteId];
    const noteHeight = note?.height ?? 200;
    columnHeights[column] += noteHeight + gap;
  }

  const maxHeight = Math.max(...columnHeights);
  return maxHeight + pinnedSectionGap;
};
