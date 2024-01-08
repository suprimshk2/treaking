export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader?.result?.toString().split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

export const toArrayBuffer = (buf: any) => {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  return view.map((x, i) => buf[i]);
};

export const getExtensionTypeOfFile = (name: string) =>
  name.slice(name.lastIndexOf('.'));

export const getFilenameWithoutExtension = (name: string) =>
  name.slice(0, name.lastIndexOf('.'));

export const getFileNameWithExtension = (
  originalName: string,
  name: string
) => {
  const extension = getExtensionTypeOfFile(originalName);
  return `${name}${extension}`;
};

export const getMimeType = (filename: string) => {
  const typeOfFile = getExtensionTypeOfFile(filename);
  switch (typeOfFile) {
    case '.doc':
    case '.DOC':
      return 'application/msword';
    case '.pdf':
    case '.PDF':
      return 'application/pdf';
    case '.png':
    case '.PNG':
      return 'image/png';
    case '.jpeg':
    case '.jpg':
    case '.JPEG':
    case '.JPG':
      return 'image/jpeg';
    case '.json':
    case '.JSON':
      return 'application/json';
    case '.docx':
    case '.DOCX':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case '.txt':
    case '.TXT':
      return 'text/plain';
    default:
      return 'text/plain';
  }
};

export const downloadAsFile = ({
  fileName,
  data,
}: {
  fileName: string;
  data: any;
}) => {
  if (!data) return;
  const mimeType = getMimeType(getExtensionTypeOfFile(fileName));
  //   const arraybuffer = toArrayBuffer(data);
  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  // create hidden dom element so it works in all browsers
  const a = document.createElement('a');
  a.setAttribute('style', 'display:none;');
  document.body.appendChild(a);
  // create file, attach to hidden element and open hidden element
  a.href = url;
  a.download = fileName;
  a.click();
  document.body.removeChild(a);
};
