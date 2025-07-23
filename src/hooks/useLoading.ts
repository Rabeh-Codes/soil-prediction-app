import { useState } from 'react';
export const useLoading = () => {
  const [isLoading] = useState(false);
  return { isLoading };
};
