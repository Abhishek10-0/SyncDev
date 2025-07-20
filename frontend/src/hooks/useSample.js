import { useState } from 'react';

export function useSample() {
  const [value, setValue] = useState(null);
  return [value, setValue];
} 