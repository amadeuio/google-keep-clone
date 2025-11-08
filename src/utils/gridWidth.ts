import { GRID_CONFIG } from '@/constants';

export const getNotesTotalWidth = (gridColumns: number): number => {
  const { noteWidth, gap } = GRID_CONFIG;
  return gridColumns * noteWidth + (gridColumns - 1) * gap;
};

export const getGridColumnsFromWidth = (containerWidth: number): number => {
  const { noteWidth, gap } = GRID_CONFIG;
  return Math.max(1, Math.floor((containerWidth + gap) / (noteWidth + gap)));
};
