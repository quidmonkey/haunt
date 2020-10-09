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

  gain(newGainValue, time = this.context.currentTime) {
    this.gainNode.gain.setValueAtTime(newGainValue, time);
    this.gainValue = newGainValue;
  }

  pan(newPanValue, time = this.context.currentTime) {
    this.stereoPannerNode.pan.setValueAtTime(newPanValue, time);
    this.panValue = newPanValue;
  }
}

export default AudioBus;
