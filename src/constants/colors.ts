export const NOTE_COLORS = {
  DEFAULT: '#ffffff',
  RED: '#f28b82',
  ORANGE: '#fbbc04',
  YELLOW: '#fff475',
  GREEN: '#ccff90',
  TEAL: '#a7ffeb',
  BLUE: '#aecbfa',
  PURPLE: '#d7aefb',
  PINK: '#fbb2d9',
  BROWN: '#e6c9a8',
  GRAY: '#e8eaed',
} as const;

export type NoteColor = (typeof NOTE_COLORS)[keyof typeof NOTE_COLORS];
