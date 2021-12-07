export const pageTransition = {
  duration: 0.5,
  type: 'tween',
};

export const variants = {
  init: { opacity: 0.5, x: '1024px' },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0.5, x: '-1024px' },
};
