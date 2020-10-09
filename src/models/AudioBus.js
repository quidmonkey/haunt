/**
 * @class
 * @property {AudioContext} context
 * @property {number} gainValue
 * @property {GainNode} gainNode
 * @property {AudioBufferSourceNode} inputNode
 * @property {number} panValue
 * @property {StereoPannerNode} stereoPannerNode
 * @method attach
 * @method detach
 * @method gain
 * @method pan
 */
export class AudioBus {
  constructor(
    context,
    {
      gain = 1,
      pan = 0
    } = {}
  ) {
    const gainNode = context.createGain();
    const stereoPannerNode = context.createStereoPanner();

    stereoPannerNode.connect(gainNode);
    gainNode.connect(context.destination);

    this.context = context;
    this.gainNode = gainNode;
    this.inputNode = {};
    this.stereoPannerNode = stereoPannerNode;

    this.gain(gain);
    this.pan(pan);
  }

  attach(inputNode) {
    if (this.inputNode instanceof AudioBufferSourceNode) {
      this.detach();
    }

    inputNode.connect(this.stereoPannerNode);
    this.inputNode = inputNode;
  }

  detach() {
    if (this.inputNode instanceof AudioBufferSourceNode) {
      this.inputNode.disconnect(this.stereoPannerNode);
      this.inputNode = {};
    }
  }

  gain(newGain) {
    this.gainNode.gain.setValueAtTime(newGain, this.context.currentTime);
    this.gainValue = newGain;
  }

  pan(newPan) {
    this.stereoPannerNode.pan.setValueAtTime(newPan, this.context.currentTime);
    this.panValue = newPan;
  }
}

export default AudioBus;
