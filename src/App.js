import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { hot } from 'react-hot-loader/root';

import { exportSound, getHowlerSound } from './utils/audioUtils';

import FileLoader from './components/FileLoader';
import StereoPanner from './components/StereoPanner';

import styles from './App.module.css';

function App() {
  const [fileName, setFileName] = useState('');
  const [showFileLoader, setShowFileLoader] = useState(false);
  const [sound, setSound] = useState({});

  const onFileLoad = async (newFileName, newFileType, newFileData) => {
    const newSound = await getHowlerSound(newFileData.fileString);

    setFileName(newFileName);
    setSound(newSound);
  };

  const onExport = () => {
    const outputFileName = `${fileName}-export.wav`;
    exportSound(sound.audioBuffer, outputFileName);
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
            isEmpty(sound)
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
                  onStereoPan={newStereoPanValue => sound.stereo(newStereoPanValue)}
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
                      sound.unload();

                      setFileName('');
                      setShowFileLoader(true);
                      setSound({});
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
