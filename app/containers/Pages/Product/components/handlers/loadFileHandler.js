export const loadFileHandler = (action, event, field) => {
  const [file] = event.target.files;

  if (!file) {
    return;
  }

  if (!file.type.match(/svg|png|jpg|jpeg|mp4|mp3|mpeg/g)) {
    return;
  }

  const blob = new Blob([file], {
    type: file.type,
  });

  action(prev => {
    const copiedOjbect = Object.assign({}, prev);
    copiedOjbect[field] = {
      file,
      blob: URL.createObjectURL(blob),
      id: copiedOjbect.id,
    };

    return copiedOjbect;
  });
};
