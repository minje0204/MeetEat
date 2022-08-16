export const constraints = {
  audio: true,
  video: {
    mandatory: {
      width: 240,
      height: 100,
      maxFrameRate: 15,
      minFrameRate: 15,
    },
  },
};
