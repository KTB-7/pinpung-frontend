export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation 미제공 브라우저'));
    }

    navigator.geolocation.getCurrentPosition(
      (postion) => {
        const { latitude, longitude } = postion.coords;
        console.log(`위도: ${latitude}, 경도: ${longitude}`);
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error);
        console.log(`위치 정보 요청 실패: ${error.message}`);
      },
    );
  });
};
