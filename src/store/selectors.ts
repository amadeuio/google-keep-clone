import { useStore, type Store } from '@/store';
import { filterNote, getPositionFromNoteId, mapNoteToDisplay } from '@/utils';
import { useMemo } from 'react';
import { createSelector } from 'reselect';

export const selectActions = (state: Store) => state.actions;

export const selectLabels = (state: Store) => state.labels;

export const selectNotes = (state: Store) => state.notes;

export const selectFilters = (state: Store) => state.filters;

export const selectFiltersSearch = (state: Store) => state.filters.search;

export const selectFiltersView = (state: Store) => state.filters.view;

export const selectActiveNote = (state: Store) => state.activeNote;

export const selectActiveNoteId = (state: Store) => state.activeNote.id;

export const selectActiveNotePosition = (state: Store) => state.activeNote.position;

export const selectNotesOrder = (state: Store) => state.notesOrder;

export const selectUi = (state: Store) => state.ui;

export const selectGridColumns = (state: Store) => state.ui.gridColumns;

const selectLabelsById = createSelector([selectLabels], (labels) =>
  Object.fromEntries(labels.map((l) => [l.id, l] as const)),
);

export const selectFilteredNotes = createSelector([selectNotes, selectFilters], (notes, filters) =>
  notes.filter((n) => filterNote(n, filters)),
);

export const selectFilteredNotesOrder = createSelector(
  [selectFilteredNotes, selectNotesOrder],
  (filteredNotes, notesOrder) => {
    const filteredNoteIds = new Set(filteredNotes.map((n) => n.id));
    return notesOrder.filter((id) => filteredNoteIds.has(id));
  },
);

export const selectDisplayNotes = createSelector(
  [selectFilteredNotes, selectLabelsById],
  (filteredNotes, labelsById) => filteredNotes.map((n) => mapNoteToDisplay(n, labelsById)),
);

export const selectActiveNoteDisplay = createSelector(
  [selectNotes, selectActiveNote, selectLabelsById],
  (notes, activeNote, labelsById) => {
    const note = notes.find((n) => n.id === activeNote.id);
    return note ? mapNoteToDisplay(note, labelsById) : null;
  },
);

const selectNotePositionById = (noteId: string) =>
  createSelector(
    [selectFilteredNotesOrder, selectFilteredNotes, selectGridColumns],
    (filteredNotesOrder, filteredNotes, gridColumns) =>
      getPositionFromNoteId(noteId, filteredNotesOrder, filteredNotes, gridColumns),
  );

export const useSelectNotePositionById = (noteId: string) =>
  useStore(useMemo(() => selectNotePositionById(noteId), [noteId]));

const selectNoteHasLabel = (noteId: string, labelId: string) =>
  createSelector(
    [selectNotes],
    (notes) => notes.find((n) => n.id === noteId)?.labelIds.includes(labelId) ?? false,
  );

export const useSelectNoteHasLabel = (noteId: string, labelId: string) =>
  useStore(useMemo(() => selectNoteHasLabel(noteId, labelId), [noteId, labelId]));

const selectFilteredLabels = (searchTerm: string) =>
  createSelector([selectLabels], (labels) =>
    labels.filter((label) => label.name.toLowerCase().includes(searchTerm.toLowerCase())),
  );

export const useSelectFilteredLabels = (searchTerm: string) =>
  useStore(useMemo(() => selectFilteredLabels(searchTerm), [searchTerm]));

const selectIsNoteActive = (noteId: string) => (state: Store) => state.activeNote.id === noteId;

export const useSelectIsNoteActive = (noteId: string) => useStore(selectIsNoteActive(noteId));
