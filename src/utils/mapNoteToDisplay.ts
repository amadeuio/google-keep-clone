import type { DisplayNote, Label, Note } from '@/types';
import { getColorValue } from './';

export const mapNoteToDisplay = (note: Note, labels: Label[]): DisplayNote => {
  const { labelIds, colorId, ...rest } = note;
  const noteLabels = labels.filter((label) => labelIds.includes(label.id));
  const colorValue = getColorValue(colorId);

  return {
    ...rest,
    colorId,
    labels: noteLabels,
    colorValue,
  };
};