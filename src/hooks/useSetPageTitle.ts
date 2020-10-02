import { useEffect } from 'react';

export function useSetPageTitle(title = ''): void {
  useEffect(() => {
    if (document) {
      document.title = title;
    }
  }, [title]);
}
