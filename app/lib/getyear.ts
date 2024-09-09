

export const SEMESTERS = ['1', '2', 'summer'];

export const CURRENT_YEAR = new Date().getFullYear();

export const YEARS = Array.from({ length: 30 }, (_, i) => CURRENT_YEAR - i);
