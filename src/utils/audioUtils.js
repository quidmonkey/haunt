import encodeWav from 'audiobuffer-to-wav';

import { downloadFile } from './generalUtils';

export const exportBufferToWav = (audioBuffer, fileName) => {
  const wavBuffer = encodeWav(audioBuffer);
  const blob = new Blob([wavBuffer], { type: 'audio/wav' });
  const fileString = URL.createObjectURL(blob);

  downloadFile(fileName, fileString);
};

export default {
  exportBufferToWav
};
