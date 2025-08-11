import { labels as initialLabels, notes as initialNotes } from '@/data';
import type { Label, Note } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

export interface Filters {
  search: string;
  labelId: string | null;
}

export interface Store {
  notes: Note[];
  labels: Label[];
  filters: Filters;
  ui: {
    isEditLabelsMenuOpen: boolean;
  };
  actions: {
    setNotes: (notes: Note[]) => void;
    addNote: (note: Note) => void;
    removeNote: (id: string) => void;
    updateNote: (id: string, note: Note) => void;
    toggleNoteLabel: (noteId: string, label: string) => void;
    createLabel: (label: string) => void;
    setFilters: (filters: Partial<Filters>) => void;
    createLabelAndAddToNote: (label: string, noteId: string) => void;
    setIsEditLabelsMenuOpen: (isOpen: boolean) => void;
  };
}

export const useStore = create<Store>((set) => ({
  notes: initialNotes,
  labels: initialLabels,
  filters: {
    search: '',
    labelId: null,
  },
  ui: {
    isEditLabelsMenuOpen: false,
  },
  actions: {
    setNotes: (notes: Note[]) => {
      set({ notes });
    },
    addNote: (note: Note) => {
      set((state) => ({ notes: [...state.notes, note] }));
    },
    removeNote: (id) => {
      set((state) => ({ notes: state.notes.filter((note) => note.id !== id) }));
    },
    updateNote: (id, note) => {
      set((state) => ({ notes: state.notes.map((n) => (n.id === id ? note : n)) }));
    },
    toggleNoteLabel: (noteId: string, labelId: string) => {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId
            ? {
                ...note,
                labelIds: note.labelIds.includes(labelId)
                  ? note.labelIds.filter((l) => l !== labelId)
                  : [...note.labelIds, labelId],
              }
            : note,
        ),
      }));
    },
    createLabel: (label: string) => {
      set((state) => ({ labels: [...state.labels, { id: uuidv4(), name: label }] }));
    },
    setFilters: (filters) => {
      set((state) => ({ filters: { ...state.filters, ...filters } }));
    },
    createLabelAndAddToNote: (label: string, noteId: string) => {
      set((state) => {
        const newId = uuidv4();

        return {
          labels: [...state.labels, { id: newId, name: label }],
          notes: state.notes.map((note) =>
            note.id === noteId ? { ...note, labelIds: [...note.labelIds, newId] } : note,
          ),
        };
      });
    },
    setIsEditLabelsMenuOpen: (isOpen: boolean) => {
      set({ ui: { isEditLabelsMenuOpen: isOpen } });
    },
  },
}));
