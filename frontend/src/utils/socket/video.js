export const constraints = {
  audio: true,
  video: {
    mandatory: {
      maxWidth: 320,
      maxFrameRate: 15,
      minFrameRate: 15,
    },
  },
};
