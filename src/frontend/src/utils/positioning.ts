interface Position {
  x: number;
  y: number;
}

interface Rect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export function getRandomPosition(width: number, height: number): Position {
  const margin = 20;
  const maxX = window.innerWidth - width - margin;
  const maxY = window.innerHeight - height - margin;

  const x = Math.max(margin, Math.random() * maxX);
  const y = Math.max(margin, Math.random() * maxY);

  return { x, y };
}

export function checkOverlap(
  position: Position,
  width: number,
  height: number,
  targetRect: DOMRect
): boolean {
  const rect1: Rect = {
    left: position.x,
    top: position.y,
    right: position.x + width,
    bottom: position.y + height,
  };

  const rect2: Rect = {
    left: targetRect.left,
    top: targetRect.top,
    right: targetRect.right,
    bottom: targetRect.bottom,
  };

  // Add padding to avoid buttons being too close
  const padding = 50;

  return !(
    rect1.right + padding < rect2.left ||
    rect1.left - padding > rect2.right ||
    rect1.bottom + padding < rect2.top ||
    rect1.top - padding > rect2.bottom
  );
}
