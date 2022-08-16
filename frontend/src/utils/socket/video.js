export const constraints = {
  audio: true,
  video: {
    mandatory: {
      maxWidth: 240,
      maxheight: 100,
      maxFrameRate: 15,
      minFrameRate: 15,
    },
  },
};
