import { useRef, useEffect, useCallback, useState } from 'react';
import { SETTINGS_BAR_PROPERTY } from 'shared/constants/settings';

const { SIDEBAR_WIDTH } = SETTINGS_BAR_PROPERTY;

export function useHorizontalScroll<T extends HTMLElement>() {
  const elRef = useRef<T>(null);
  useEffect(() => {
    const el = elRef?.current;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      if (el) {
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          //   behavior: 'smooth',
        });
      }
    };
    if (el) {
      el.addEventListener('wheel', onWheel);
    }
    return () => el?.removeEventListener('wheel', onWheel);
  }, []);
  return elRef;
}

type UseResizeProps = {
  minWidth: number;
};

type UseResizeReturn = {
  width: number;
  enableResize: any;
  reset: any;
};

export const useResize = ({ minWidth }: UseResizeProps): UseResizeReturn => {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(minWidth);
  const [initialX, setInitialX] = useState(0);

  useEffect(() => {
    return () => {
      setWidth(minWidth);
    };
  }, [minWidth]);

  const enableResize = useCallback(
    (e: MouseEvent) => {
      setIsResizing(true);
      setInitialX(e.clientX);
    },
    [setIsResizing, setInitialX]
  );

  const disableResize = useCallback(() => {
    setIsResizing(false);
  }, [setIsResizing]);

  const reset = () => {
    setWidth(minWidth);
  };

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const offsetX = e.clientX - initialX;
        const newWidth = width - offsetX;
        const maxWidth =
          window.innerWidth - Number(SIDEBAR_WIDTH.split('px')[0]);
        if (newWidth >= minWidth && newWidth <= maxWidth) {
          setWidth(newWidth);
          setInitialX(e.clientX);
        }
      }
    },
    [width, minWidth, isResizing, setWidth, initialX, setInitialX]
  );

  useEffect(() => {
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', disableResize);

    return () => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', disableResize);
    };
  }, [disableResize, resize]);

  return { width, enableResize, reset };
};
