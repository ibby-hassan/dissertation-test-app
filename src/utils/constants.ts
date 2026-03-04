export const STORAGE_KEY = 'psvtr_study_state';
export const CUSTOM_STORAGE_KEY = 'psvtr_custom_study_state';
export const RESET_COUNT_KEY = 'psvtr_reset_count';

export const CORRECT_ANSWERS: Record<number, string> = {
  1: 'b', 2: 'a', 3: 'a', 4: 'd', 5: 'b',
  6: 'c', 7: 'e', 8: 'e', 9: 'e', 10: 'd',
  11: 'e', 12: 'e', 13: 'b', 14: 'd', 15: 'c',
  16: 'e', 17: 'a', 18: 'a', 19: 'b', 20: 'b',
  21: 'a', 22: 'd', 23: 'd', 24: 'c', 25: 'd',
  26: 'c', 27: 'b', 28: 'e', 29: 'c', 30: 'e'
};

export const CUSTOM_QUESTION_ORDER = [
  '1a', '1c', '2a', '1b', '2c', '3a',
  '2b', '3b', '4a', '3c', '4b', '4c'
];

export const CUSTOM_CORRECT_ANSWERS: Record<number, string> = {
  1: 'd', 2: 'c', 3: 'e', 4: 'c', 5: 'a', 6: 'b',
  7: 'b', 8: 'e', 9: 'a', 10: 'c', 11: 'a', 12: 'd'
};