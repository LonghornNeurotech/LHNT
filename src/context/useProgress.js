// Developer's Notes: Progress Tracking on the front-end side does mostly work,
// but needs to be refined further to eliminate the bug that increasingly add 
// more console error messages in the Console!

// Exports both ProgressContext and ProgressProvider component
import { useContext } from 'react';
import { ProgressContext } from './ProgressContext';

export const useProgress = () => useContext(ProgressContext);