export const convertBase64ToArrayBuffer = base64string => Uint8Array.from(
  atob(base64string), c => c.charCodeAt(0)
);

export const downloadFile = (fileName, fileString) => {
  const link = document.createElement('a');

  link.download = fileName;
  link.href = fileString;
  link.target = '_self';

  document.body.appendChild(link);
  link.click();
};

export default {
  convertBase64ToArrayBuffer,
  downloadFile
};
