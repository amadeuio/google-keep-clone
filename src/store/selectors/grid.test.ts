import type { Note } from '@/types';
import { describe, expect, it } from 'vitest';
import type { Store } from '../store';
import { selectNoteIdFromPosition, selectPositionFromNoteId, selectTotalHeight } from './grid';

const createNote = (overrides?: Partial<Note>): Note => ({
  id: '1',
  title: 'Test Note',
  content: 'Test content',
  colorId: 'default',
  labelIds: [],
  isPinned: false,
  isArchived: false,
  isTrashed: false,
  ...overrides,
});

const createStore = (overrides?: Partial<Store> & { gridColumns?: number }): Store => {
  const gridColumns = overrides?.gridColumns ?? 2;
  const { gridColumns: _, ...restOverrides } = overrides ?? {};
  return {
    notes: [],
    notesOrder: [],
    noteHeights: {},
    activeNote: { id: null, position: null },
    labels: [],
    filters: { search: '', view: { type: 'notes' } },
    ui: {
      isEditLabelsMenuOpen: false,
      isSidebarCollapsed: false,
      gridColumns,
    },
    actions: {} as Store['actions'],
    ...restOverrides,
  };
};

describe('selectNoteIdFromPosition', () => {
  it('should find note in pinned section', () => {
    const store = createStore({
      notes: [createNote({ id: '1', isPinned: true })],
      notesOrder: ['1'],
      noteHeights: { '1': 100 },
      gridColumns: 2,
    });
    const selector = selectNoteIdFromPosition(store);
    // note 1: { x: 0, y: 0 }
    expect(selector(10, 10)).toBe('1');
  });

  it('should find note in unpinned section', () => {
    const store = createStore({
      notes: [
        createNote({ id: '1', isPinned: true }),
        createNote({ id: '2', isPinned: true }),
        createNote({ id: '3', isPinned: false }),
        createNote({ id: '4', isPinned: false }),
      ],
      notesOrder: ['1', '2', '3', '4'],
      noteHeights: { '1': 100, '2': 150, '3': 200, '4': 250 },
      gridColumns: 2,
    });
    const selector = selectNoteIdFromPosition(store);
    // note 4: { x: 238 + 16 = 254, y: 150 + 68 = 218 }
    expect(selector(260, 220)).toBe('4');
  });
});

describe('selectPositionFromNoteId', () => {
  it('should return position for pinned note', () => {
    const store = createStore({
      notes: [createNote({ id: '1', isPinned: true })],
      notesOrder: ['1'],
      noteHeights: { '1': 100 },
      gridColumns: 2,
    });
    const selector = selectPositionFromNoteId('1', true)(store);
    // note 1: { x: 0, y: 0 }
    expect(selector).toEqual({ x: 0, y: 0 });
  });

  it('should return position for unpinned note with pinned notes in the grid', () => {
    const store = createStore({
      notes: [
        createNote({ id: '1', isPinned: true }),
        createNote({ id: '2', isPinned: true }),
        createNote({ id: '3', isPinned: false }),
        createNote({ id: '4', isPinned: false }),
      ],
      notesOrder: ['1', '2', '3', '4'],
      noteHeights: { '1': 100, '2': 150, '3': 200, '4': 250 },
      gridColumns: 2,
    });
    const selector = selectPositionFromNoteId('4', false)(store);
    // note 4: { x: 238 + 16 = 254, y: 150 + 68 = 218 }
    expect(selector).toEqual({ x: 254, y: 218 });
  });
});

describe('selectTotalHeight', () => {
  it('should return sum of pinned and unpinned heights', () => {
    const store = createStore({
      notes: [
        createNote({ id: '1', isPinned: true }),
        createNote({ id: '2', isPinned: true }),
        createNote({ id: '3', isPinned: false }),
        createNote({ id: '4', isPinned: false }),
      ],
      notesOrder: ['1', '2', '3', '4'],
      noteHeights: { '1': 100, '2': 150, '3': 200, '4': 250 },
      gridColumns: 2,
    });
    // col 0: 100 + 68 + 200 = 266
    // col 1: 150 + 68 + 250 = 486 (max)
    expect(selectTotalHeight(store)).toBe(468);
  });

  it('should return unpinned height when there are no pinned notes', () => {
    const store = createStore({
      notes: [
        createNote({ id: '1', isPinned: false }),
        createNote({ id: '2', isPinned: false }),
        createNote({ id: '3', isPinned: false }),
        createNote({ id: '4', isPinned: false }),
      ],
      notesOrder: ['1', '2', '3', '4'],
      noteHeights: { '1': 100, '2': 150, '3': 200, '4': 250 },
      gridColumns: 2,
    });
    // col 0: 100 + 16 + 200 = 316
    // col 1: 150 + 16 + 250 = 416 (max)
    expect(selectTotalHeight(store)).toBe(416);
  });
});
