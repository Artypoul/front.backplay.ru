export const loadFileHandler = (action, event, field) => {
  const [file] = event.target.files;

  if (!file) {
    return;
  }

  const rexexp = field === 'demo' ? /wa(v|ve)|aiff|x\-aiff|octet\-stream|flac|x\-flac|mpeg|mp3|ogg/g : /svg|png|jpg|jpeg|mp4|mp3|mpeg/g;
  
  if (!file.type.match(rexexp)) {
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
