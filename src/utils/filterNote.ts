import type { Filters, Note } from '@/types';

export const filterNote = (note: Note, filters: Filters): boolean => {
  const q = filters.search.trim().toLowerCase();
  const matchesSearch =
    q === '' || note.title.toLowerCase().includes(q) || note.content.toLowerCase().includes(q);

  switch (filters.view.type) {
    case 'notes':
      return !note.isArchived && !note.isTrashed && matchesSearch;
    case 'archive':
      return note.isArchived && !note.isTrashed && matchesSearch;
    case 'trash':
      return note.isTrashed && matchesSearch;
    case 'label':
      return (
        !note.isTrashed &&
        !note.isArchived &&
        note.labelIds.includes(filters.view.id) &&
        matchesSearch
      );
  }
};
