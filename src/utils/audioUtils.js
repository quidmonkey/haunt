import encodeWAV from 'audiobuffer-to-wav';
import { Howl } from 'howler';

import { downloadFile } from './generalUtils';

export const exportSound = (audioBuffer, fileName) => {
  const wavBuffer = encodeWAV(audioBuffer);
  const blob = new Blob([wavBuffer], { type: 'audio/wav' });
  const fileString = URL.createObjectURL(blob);

  downloadFile(fileName, fileString);
};

export const getSound = async base64String => new Promise(resolve => {
  const newSound = new Howl({
    autoplay: true,
    loop: true,
    src: [base64String]
  });

  const setAudioBuffer = () => {
    // eslint-disable-next-line no-underscore-dangle
    const node = newSound._sounds[0]._node;

    console.log('~~~ node', node);

    if (node.bufferSource) {
      newSound.audioBuffer = node.bufferSource.buffer;
    }
  };

  newSound.once('load', setAudioBuffer);

  newSound.on('play', setAudioBuffer);
  newSound.on('pos', setAudioBuffer);
  newSound.on('stereo', setAudioBuffer);
  newSound.on('volume', setAudioBuffer);

  resolve(newSound);
});

export default {
  exportSound,
  getSound
};
