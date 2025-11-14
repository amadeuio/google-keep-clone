import type { Note } from '@/types';

export const sortNotesByPinned = (noteIds: string[], notes: Note[]): string[] => {
  const notesById = Object.fromEntries(notes.map((n) => [n.id, n] as const));
  const pinnedIds: string[] = [];
  const unpinnedIds: string[] = [];

  for (const id of noteIds) {
    const note = notesById[id];
    if (note?.isPinned) {
      pinnedIds.push(id);
    } else {
      unpinnedIds.push(id);
    }
  }

  return [...pinnedIds, ...unpinnedIds];
};