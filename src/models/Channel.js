import AudioBus from './AudioBus';
import Sound from './Sound';

import { exportBufferToWav } from '../utils/audioUtils';

export class Channel {
  constructor(context, audioBuffer, name = '') {
    const audioBus = new AudioBus(context);
    const sound = new Sound(context, audioBuffer, audioBus);

    this.audioBus = audioBus;
    this.name = name;
    this.sound = sound;
  }

  export() {
    const offlineContext = new OfflineAudioContext(
      this.sound.audioBuffer.numberOfChannels,
      this.sound.audioBuffer.length,
      this.sound.audioBuffer.sampleRate
    );
    const offlineAudioBus = new AudioBus(offlineContext);
    const offlineSound = new Sound(offlineContext, this.sound.audioBuffer, offlineAudioBus);

    offlineAudioBus.pan(this.audioBus.panValue);
    offlineSound.play();

    offlineContext.startRendering().then(renderedBuffer => {
      const outputFileName = `${this.name}-export.wav`;
      exportBufferToWav(renderedBuffer, outputFileName);
    });
  }
}

export default Channel;
