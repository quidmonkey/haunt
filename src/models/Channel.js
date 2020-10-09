import AudioBus from './AudioBus';

import { exportBufferToWav } from '../utils/audioUtils';

/**
 * @class
 * @property {AudioBuffer} audioBuffer
 * @property {AudioBufferSourceNode} inputNode
 * @property {Boolean} loop
 * @property {string} name
 * @property {Boolean} playing
 * @method connect
 * @method disconnect
 * @method export
 * @method play
 * @method stop
 */
export class Channel extends AudioBus {
  constructor(
    context,
    {
      audioBuffer = {},
      gain = 1,
      loop = true,
      name = '',
      pos = { x: 0, y: 0, z: 0 }
    } = {}
  ) {
    super(context, { gain, pos });

    this.audioBuffer = audioBuffer;
    this.inputNode = {};
    this.loop = loop;
    this.name = name;
    this.playing = false;
  }

  connect(audioBuffer) {
    this.audioBuffer = audioBuffer;

    if (this.playing) {
      this.stop();
    } else {
      this.detach();
    }
  }

  disconnect() {
    this.audioBuffer = {};

    if (this.playing) {
      this.stop();
    } else {
      this.detach();
    }
  }

  export() {
    const offlineContext = new OfflineAudioContext(
      this.audioBuffer.numberOfChannels,
      this.audioBuffer.length,
      this.audioBuffer.sampleRate
    );
    const offlineChannel = new Channel(offlineContext, {
      audioBuffer: this.audioBuffer,
      gain: this.gainValue,
      pos: this.posValue
    });

    offlineChannel.play();

    offlineContext.startRendering().then(renderedBuffer => {
      const outputFileName = `${this.name}-export.wav`;
      exportBufferToWav(renderedBuffer, outputFileName);
    });
  }

  play(time = 0) {
    if (!this.playing && this.audioBuffer instanceof AudioBuffer) {
      const inputNode = this.context.createBufferSource();

      inputNode.buffer = this.audioBuffer;
      inputNode.loop = this.loop;

      this.attach(inputNode);

      inputNode.start(time);

      this.playing = true;
    }
  }

  stop() {
    if (this.playing) {
      this.inputNode.stop();
      this.detach();
      this.playing = false;
    }
  }
}

export default Channel;
