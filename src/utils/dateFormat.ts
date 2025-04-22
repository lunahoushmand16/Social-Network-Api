/**
 * Format a JavaScript Date object into a readable string.
 * Example output: "Apr 22, 2025 at 12:47 PM"
 */
export const formatDate = (timestamp: Date): string => {
    return timestamp.toLocaleString('en-US', {
        month: 'short',    // Apr
        day: 'numeric',    // 22
        year: 'numeric',   // 2025
        hour: 'numeric',   // 1
        minute: '2-digit', // 03
        hour12: true,      // AM/PM format
        timeZone: 'UTC'    // consistent formatting  
    });
  };   