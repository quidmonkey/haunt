import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { hot } from 'react-hot-loader/root';

import Channel from './models/Channel';

import Fader from './components/Fader';
import FileLoader from './components/FileLoader';
import Panner from './components/Panner';

import styles from './App.module.css';

function App() {
  const [audioContext] = useState(new AudioContext());
  const [channel, setChannel] = useState({});
  const [showFileLoader, setShowFileLoader] = useState(false);

  const onFileLoad = (newFileName, newFileType, newFileData) => {
    audioContext.decodeAudioData(newFileData.arrayBuffer, newAudioBuffer => {
      const newChannel = new Channel(audioContext, {
        audioBuffer: newAudioBuffer,
        name: newFileName
      });

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
                Load Wav
              </Button>
              :
              <>
                <div className={styles.controls}>
                  <Fader
                    defaultValue={channel.gainValue}
                    onFaderChange={newGainValue => channel.gain(newGainValue)}
                  />

                  <Panner
                    defaultValue={channel.posValue}
                    onPannerChange={newPosValue => channel.pos(newPosValue)}
                  />
                </div>

                <div className={styles.actions}>
                  <Button
                    onClick={() => channel.play()}
                    variant="primary"
                  >
                    Play
                  </Button>
                  <Button
                    onClick={() => channel.stop()}
                    variant="primary"
                  >
                    Stop
                  </Button>
                  <Button
                    onClick={onExport}
                    variant="primary"
                  >
                    Export Wav
                  </Button>
                  <Button
                    onClick={() => {
                      channel.stop();

                      setChannel({});
                      setShowFileLoader(true);
                    }}
                    variant="primary"
                  >
                    Load Wav
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
