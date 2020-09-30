export const downloadFile = (fileName, fileString) => {
  const link = document.createElement('a');

  link.download = fileName;
  link.href = fileString;
  link.target = '_self';

  document.body.appendChild(link);
  link.click();
};

export default {
  downloadFile
};
