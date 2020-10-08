/**
 * @class
 * @property {AudioBuffer} audioBuffer
 * @property {AudioBus} audioBus
 * @property {AudioContext} context
 * @property {Boolean} loop
 * @property {AudioBufferSourceNode} node
 */
export class Sound {
  constructor(context, audioBuffer, audioBus, options = { loop: true }) {
    this.audioBuffer = audioBuffer;
    this.audioBus = audioBus;
    this.context = context;
    this.loop = options.loop;
    this.node = {};
  }

  play(time = 0) {
    if (!(this.node instanceof AudioBufferSourceNode)) {
      const node = this.context.createBufferSource();

      node.buffer = this.audioBuffer;
      node.loop = this.loop;

      this.audioBus.attach(node);
      this.node = node;

      node.start(time);
    }
  }

  stop() {
    if (this.node instanceof AudioBufferSourceNode) {
      this.node.stop();
      this.audioBus.detach();
      this.node = {};
    }
  }
}

export default Sound;
