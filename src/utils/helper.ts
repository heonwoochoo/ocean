export const distance = (x1: number, x2: number, y1: number, y2: number) => {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
};

export const value = (x1: number, x2: number) => {
  if (x1 - x2 > 0) {
    return 1;
  } else {
    return -1;
  }
};
