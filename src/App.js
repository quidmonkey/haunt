import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { hot } from 'react-hot-loader/root';

import Channel from './models/Channel';

import Fader from './components/Fader';
import FileLoader from './components/FileLoader';
import StereoPanner from './components/StereoPanner';

import styles from './App.module.css';

function App() {
  const [audioContext] = useState(new AudioContext());
  const [channel, setChannel] = useState({});
  const [showFileLoader, setShowFileLoader] = useState(false);

  const onFileLoad = (newFileName, newFileType, newFileData) => {
    audioContext.decodeAudioData(newFileData.arrayBuffer, newAudioBuffer => {
      const newChannel = new Channel(audioContext, newAudioBuffer, newFileName);

      setChannel(newChannel);
    });
  };

  const onExport = () => {
    channel.export();
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
            isEmpty(channel)
              ?
              <Button
                onClick={() => setShowFileLoader(true)}
                variant="primary"
              >
                Load WAV
              </Button>
              :
              <>
                <Fader
                  defaultValue={channel.audioBus.gainValue}
                  onGain={newGain => channel.audioBus.gain(newGain)}
                />
                <StereoPanner
                  defaultValue={channel.audioBus.panValue}
                  onStereoPan={newPan => channel.audioBus.pan(newPan)}
                />

                <div className={styles.actions}>
                  <Button
                    onClick={() => channel.sound.play()}
                    variant="primary"
                  >
                    Play
                  </Button>
                  <Button
                    onClick={() => channel.sound.stop()}
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
                      setChannel();
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
