export function thumbnailify(base64Image, targetSize, callback) {
  var img = new Image();

  img.onload = function() {
    var width = img.width,
        height = img.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");

    canvas.width = canvas.height = targetSize;

    ctx.drawImage(
      img,
      width > height ? (width - height) / 2 : 0,
      height > width ? (height - width) / 2 : 0,
      width > height ? height : width,
      width > height ? height : width,
      0, 0,
      targetSize, targetSize
    );

    callback(canvas.toDataURL('image/png'));
  };

  img.src = base64Image;
};

export function getFormData(data) {
  const formData = new FormData();
  Object.keys(data).forEach(k => {
    formData.append(k, data[k]);
  });
  return formData;
}

export function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  var sliceSize = 1024;
  var byteCharacters = atob(base64Data);
  var bytesLength = byteCharacters.length;
  var slicesCount = Math.ceil(bytesLength / sliceSize);
  var byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}
