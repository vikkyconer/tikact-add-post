export const getVideoSpeed = (currentSpeed) => {
  switch (currentSpeed) {
    case 0.3:
      return 3;
    case 0.5:
      return 2;
    case 1:
      return 1;
    case 2:
      return 0.5;
    case 3:
      return 0.3;
    default:
      return 1;
  }
};
