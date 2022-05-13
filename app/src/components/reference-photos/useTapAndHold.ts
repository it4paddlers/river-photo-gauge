import { SyntheticEvent, useEffect, useMemo } from 'react';

function ignoreEvent(event: SyntheticEvent) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}

export default function useTapAndHold(
  url: string,
  onSelect: (url: string | null) => void,
) {
  useEffect(() => {
    const handler = () => onSelect(null);
    document.addEventListener('mouseup', handler);
    return () => {
      document.removeEventListener('mouseup', handler);
    };
  }, [onSelect]);

  return useMemo(() => {
    return {
      onMouseDown: () => onSelect(url),
      onContextMenu: ignoreEvent,
      onTouchStart: () => onSelect(url),
      onTouchEnd: () => onSelect(null),
      onTouchCancel: () => onSelect(null),
    };
  }, [url, onSelect]);
}
