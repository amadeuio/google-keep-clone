import type { DisplayNote, LabelsById, Note } from '@/types';

export const mapNoteToDisplay = (note: Note, labelsById: LabelsById): DisplayNote => {
  const { labelIds, ...rest } = note;
  const labels = labelIds.map((id) => labelsById[id]).filter(Boolean);

  return {
    ...rest,
    labels,
  };
};
