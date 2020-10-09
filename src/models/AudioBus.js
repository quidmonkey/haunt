/**
 * @class
 * @property {AudioContext} context
 * @property {number} gainValue
 * @property {GainNode} gainNode
 * @property {AudioBufferSourceNode} inputNode
 * @property {Object} posValue
 * @property {number} posValue.x
 * @property {number} posValue.y
 * @property {number} posValue.z
 * @property {PannerNode} pannerNode
 * @method attach
 * @method detach
 * @method gain
 * @method pos
 */
export class AudioBus {
  constructor(
    context,
    {
      gain = 1,
      pos = { x: 0, y: 0, z: 0 }
    } = {}
  ) {
    const gainNode = context.createGain();
    const pannerNode = context.createPanner();

    pannerNode.panningModel = 'HRTF';
    pannerNode.setPosition(pos.x, pos.y, pos.z);

    gainNode.connect(context.destination);
    pannerNode.connect(gainNode);

    this.context = context;
    this.gainNode = gainNode;
    this.inputNode = {};
    this.pannerNode = pannerNode;
    this.posValue = pos;

    this.gain(gain);
  }

  attach(inputNode) {
    if (this.inputNode instanceof AudioBufferSourceNode) {
      this.detach();
    }

    inputNode.connect(this.pannerNode);
    this.inputNode = inputNode;
  }

  detach() {
    if (this.inputNode instanceof AudioBufferSourceNode) {
      this.inputNode.disconnect(this.pannerNode);
      this.inputNode = {};
    }
  }

  gain(newGainValue, time = this.context.currentTime) {
    this.gainNode.gain.setValueAtTime(newGainValue, time);
    this.gainValue = newGainValue;
  }

  pos(
    { x = this.posValue.x, y = this.posValue.y, z = this.posValue.z } = {},
    time = this.context.currentTime
  ) {
    this.pannerNode.positionX.setValueAtTime(x, time);
    this.pannerNode.positionY.setValueAtTime(y, time);
    this.pannerNode.positionZ.setValueAtTime(z, time);

    this.posValue = { x, y, z };
  }
}

export default AudioBus;
