function convertToArrayBuffer(data) {

  let str let out = []
  
  for (const value of data) { str += value.d;
  
  }
  
  out- str.split(',');
  
  const buf new Uint8Array (out);
  
  downloadBlob(buf, 'd.7z', 'application/x-7z-compressed")
  
  }
  
  const downloadURL (data, fileName) => {
  
  const a = document.createElement('a') a.href data
  
  a.download-fileName document.body.appendChild(a)
  
  a.style.display='none'
  
  a.click() a.remove()
  
  }
  
  const downloadBlob (data, fileName, mimeType)->{ const blob new Blob ( [data], {
  
  type: mimeType
  
  }) const url - window.URL.createObjectURL(blob)
  
  downloadURL(url, fileName) setTimeout(() => window.URL.revokeObjectURL(url), 1000) }