import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { hot } from 'react-hot-loader/root';

import { exportSound } from './utils/audioUtils';

import FileLoader from './components/FileLoader';
import StereoPanner from './components/StereoPanner';

import styles from './App.module.css';

function App() {
  const [audioBuffer, setAudioBuffer] = useState();
  const [audioContext] = useState(new AudioContext());
  const [audioSource, setAudioSource] = useState();
  const [fileName, setFileName] = useState('');
  const [showFileLoader, setShowFileLoader] = useState(false);
  const [stereoPanNode, setStereoPanNode] = useState();

  const onFileLoad = (newFileName, newFileType, newFileData) => {
    audioContext.decodeAudioData(newFileData.arrayBuffer, newAudioBuffer => {
      console.log('~~~ newAudioBuffer', newAudioBuffer);

      const newAudioSource = audioContext.createBufferSource();
      const newStereoPanNode = audioContext.createStereoPanner();

      newAudioSource.buffer = newAudioBuffer;
      newAudioSource.loop = true;

      newAudioSource.connect(newStereoPanNode);
      newAudioSource.connect(audioContext.destination);
      newStereoPanNode.connect(audioContext.destination);

      setAudioBuffer(newAudioBuffer);
      setAudioSource(newAudioSource);
      setStereoPanNode(newStereoPanNode);
    });

    setFileName(newFileName);
  };

  const onExport = () => {
    const outputFileName = `${fileName}-export.wav`;
    exportSound(audioBuffer, outputFileName);
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
            !(audioBuffer instanceof AudioBuffer)
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
                  onStereoPan={newStereoPanValue => stereoPanNode.pan.setValueAtTime(
                    newStereoPanValue,
                    audioContext.currentTime
                  )}
                />

                <div className={styles.actions}>
                  <Button
                    onClick={() => audioSource.start(0)}
                    variant="primary"
                  >
                    Play
                  </Button>
                  <Button
                    onClick={() => audioSource.stop(0)}
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
                      setAudioSource();
                      setFileName('');
                      setShowFileLoader(true);
                      setStereoPanNode();
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
