import imageCompression from 'browser-image-compression';
export const compressAndPadImage = async (file) => {
  try {
    const compressedFile = await compressImage(file);
    const paddedImage = await addPadding(compressedFile);

    return paddedImage;
  } catch (error) {
    console.log(error);
  }
};

// 이미지 압축 함수
const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHEight: 1920,
    useWebWorker: true,
  };
  return await imageCompression(file, options);
};

// 패딩 추가 함수
const addPadding = async (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const targetWidth = 1080;
      const targetHeight = 1920;

      const originalAspectRatio = img.width / img.height;
      let newWidth, newHeight;

      if (originalAspectRatio > targetWidth / targetHeight) {
        newWidth = targetWidth;
        newHeight = Math.round(targetWidth / originalAspectRatio);
      } else {
        newHeight = targetHeight;
        newWidth = Math.round(targetHeight * originalAspectRatio);
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      const offsetX = (targetWidth - newWidth) / 2;
      const offsetY = (targetHeight - newHeight) / 2;
      ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(new File([blob], file.name, { type: 'image/webp' }));
        } else {
          reject(new Error('패딩 처리 중 블롭 변환 실패'));
        }
      }, 'image/webp');

      img.onerror = (error) => {
        reject(new Error('이미지 로드 오류:', error));
      };
    };
  });
};
