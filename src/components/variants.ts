// 共通アニメーションvariants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};
