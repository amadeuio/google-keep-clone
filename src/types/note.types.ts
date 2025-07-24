import type { NoteColor } from '@/constants';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  color: NoteColor;
  labels: string[];
  isPinned: boolean;
  isArchived: boolean;
}
