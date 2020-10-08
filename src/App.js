import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { hot } from 'react-hot-loader/root';

import AudioBus from './models/AudioBus';
import Sound from './models/Sound';

import { exportBufferToWav } from './utils/audioUtils';

import FileLoader from './components/FileLoader';
import StereoPanner from './components/StereoPanner';

import styles from './App.module.css';

function App() {
  const [audioBuffer, setAudioBuffer] = useState();
  const [audioBus, setAudioBus] = useState();
  const [audioContext] = useState(new AudioContext());
  const [fileName, setFileName] = useState('');
  const [showFileLoader, setShowFileLoader] = useState(false);
  const [sound, setSound] = useState();

  const onFileLoad = (newFileName, newFileType, newFileData) => {
    audioContext.decodeAudioData(newFileData.arrayBuffer, newAudioBuffer => {
      const newAudioBus = new AudioBus(audioContext);
      const newSound = new Sound(audioContext, newAudioBuffer, newAudioBus);

      setAudioBuffer(newAudioBuffer);
      setAudioBus(newAudioBus);
      setSound(newSound);
    });

    setFileName(newFileName);
  };

  const onExport = () => {
    const offlineContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      audioBuffer.length,
      audioBuffer.sampleRate
    );
    const offlineAudioBus = new AudioBus(offlineContext);
    const offlineSound = new Sound(offlineContext, audioBuffer, offlineAudioBus);

    offlineAudioBus.pan(audioBus.panValue);
    offlineSound.play();

    offlineContext.startRendering().then(renderedBuffer => {
      const outputFileName = `${fileName}-export.wav`;
      exportBufferToWav(renderedBuffer, outputFileName);
    });
  };

  return (
    <>
      <FileLoader
        onFileLoad={onFileLoad}
        onHide={() => setShowFileLoader(false)}
        show={showFileLoader}
      />

      <div className={styles.container}>
        <div className={styles.content}>
          {
            isEmpty(audioBus) || isEmpty(sound)
              ?
              <Button
                onClick={() => setShowFileLoader(true)}
                variant="primary"
              >
                Load WAV
              </Button>
              :
              <>
                <StereoPanner
                  onStereoPan={newPan => audioBus.pan(newPan)}
                />

                <div className={styles.actions}>
                  <Button
                    onClick={() => sound.play()}
                    variant="primary"
                  >
                    Play
                  </Button>
                  <Button
                    onClick={() => sound.stop()}
                    variant="primary"
                  >
                    Stop
                  </Button>
                  <Button
                    onClick={onExport}
                    variant="primary"
                  >
                    Export WAV
                  </Button>
                  <Button
                    onClick={() => {
                      setAudioBuffer();
                      setAudioBus();
                      setFileName('');
                      setShowFileLoader(true);
                    }}
                    variant="primary"
                  >
                    Load WAV
                  </Button>
                </div>
              </>
          }
        </div>
      </div>
    </>
  );
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
