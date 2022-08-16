export const constraints = {
  audio: true,
  video: {
    mandatory: {
      maxHeight: 100,
      maxFrameRate: 15,
      minFrameRate: 15,
    },
  },
};
