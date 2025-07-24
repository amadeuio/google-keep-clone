import { NOTE_COLORS } from '@/constants';
import type { Note } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const notes: Note[] = [
  {
    id: uuidv4(),
    title: 'Welcome to Google Keep Clone',
    content:
      'This is your first note! You can edit, delete, and create new notes. Try clicking on this note to edit it.',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    color: NOTE_COLORS.YELLOW,
    labels: [],
    isArchived: false,
    isPinned: true,
  },
  {
    id: uuidv4(),
    title: 'Shopping List',
    content: '• Milk\n• Bread\n• Eggs\n• Bananas\n• Coffee\n• Toilet paper',
    createdAt: new Date('2024-01-14T15:30:00Z'),
    updatedAt: new Date('2024-01-14T16:45:00Z'),
    color: NOTE_COLORS.GREEN,
    labels: ['shopping', 'groceries'],
    isArchived: false,
    isPinned: false,
  },
  {
    id: uuidv4(),
    title: 'Meeting Notes - Project Kickoff',
    content:
      'Team meeting scheduled for Friday 2 PM\n\nAgenda:\n- Project timeline review\n- Resource allocation\n- Next steps\n\nAction items:\n- Send meeting invite\n- Prepare presentation slides',
    createdAt: new Date('2024-01-13T09:15:00Z'),
    updatedAt: new Date('2024-01-13T11:20:00Z'),
    color: NOTE_COLORS.BLUE,
    labels: ['work', 'meeting'],
    isArchived: false,
    isPinned: true,
  },
  {
    id: uuidv4(),
    title: 'Recipe: Chocolate Chip Cookies',
    content:
      'Ingredients:\n- 2 1/4 cups flour\n- 1 cup butter\n- 3/4 cup sugar\n- 3/4 cup brown sugar\n- 2 eggs\n- 1 tsp vanilla\n- 1 tsp baking soda\n- 1/2 tsp salt\n- 2 cups chocolate chips\n\nInstructions:\n1. Preheat oven to 375°F\n2. Mix ingredients\n3. Bake for 9-11 minutes',
    createdAt: new Date('2024-01-12T14:20:00Z'),
    updatedAt: new Date('2024-01-12T14:20:00Z'),
    color: NOTE_COLORS.RED,
    labels: ['recipe', 'baking'],
    isArchived: false,
    isPinned: false,
  },
  {
    id: uuidv4(),
    title: 'Ideas for Weekend',
    content:
      'Things to do this weekend:\n\n• Visit the new art museum\n• Try that new restaurant downtown\n• Go for a hike at the park\n• Watch the new movie everyone is talking about\n• Call mom and dad\n• Clean the apartment',
    createdAt: new Date('2024-01-11T18:45:00Z'),
    updatedAt: new Date('2024-01-11T18:45:00Z'),
    color: NOTE_COLORS.PURPLE,
    labels: ['personal', 'weekend'],
    isArchived: false,
    isPinned: false,
  },
  {
    id: uuidv4(),
    title: 'Quick Reminder',
    content:
      "Don't forget to:\n- Pay electricity bill\n- Schedule dentist appointment\n- Return library books",
    createdAt: new Date('2024-01-10T12:00:00Z'),
    updatedAt: new Date('2024-01-10T12:00:00Z'),
    color: NOTE_COLORS.TEAL,
    labels: ['reminders'],
    isArchived: false,
    isPinned: false,
  },
];
