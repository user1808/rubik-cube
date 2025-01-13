export const useStyleHelpers = () => {
  const applyStyles = (element: HTMLElement, styles: Record<string, string | number>) => {
    Object.entries(styles).forEach(([key, value]) => {
      element.style[key as any] = typeof value === 'number' ? `${value}px` : value;
    });
  };

  return { applyStyles };
};
