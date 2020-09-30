import PropTypes from 'prop-types';
import React from 'react';
import { Form, Modal } from 'react-bootstrap';

import styles from './FileLoader.module.css';

const propTypes = {
  onFileLoad: PropTypes.func,
  onHide: PropTypes.func,
  show: PropTypes.bool
};

const defaultProps = {
  onFileLoad: (newFileName, newFileType, newFileString) => console.log(
    `~~~ ${newFileName}.${newFileType} loaded`
  ),
  onHide: () => { },
  show: false
};

export const FileLoader = ({ onFileLoad, onHide, show }) => {
  const onFileUpload = async e => {
    const file = e.target.files[0];

    const fileName = file.name.replace(/\.[A-Za-z]+$/, '');
    const fileType = file.name.replace(`${fileName}.`, '').toLowerCase();

    if (fileType !== 'wav') {
      // eslint-disable-next-line no-alert
      return alert(`Unable to load ${fileName} - only .wav files supported`);
    }

    const binarystring = await new Promise(resolve => {
      const reader = new FileReader();

      reader.onload = res => {
        resolve(res.target.result);
      };

      reader.readAsBinaryString(file);
    });
    const base64string = btoa(binarystring);
    const fileString = `data:audio/wav;base64,${base64string}`;

    onFileLoad(fileName, fileType, fileString);

    onHide();
  };

  return (
    <Modal
      animation={false}
      centered
      onHide={onHide}
      show={show}
    >
      <Modal.Header>
        Load Audio File
      </Modal.Header>
      <Modal.Body
        className={styles.container}
      >
        <Form>
          <Form.Group controlId="formAudioFile">
            <Form.File
              onChange={onFileUpload}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

FileLoader.propTypes = propTypes;
FileLoader.defaultProps = defaultProps;

export default FileLoader;
