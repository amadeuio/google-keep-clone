import { GRID_CONFIG } from '@/constants';

export const calculateColumns = (containerWidth: number): number => {
  const { noteWidth, gap } = GRID_CONFIG;
  return Math.max(1, Math.floor((containerWidth + gap) / (noteWidth + gap)));
};
