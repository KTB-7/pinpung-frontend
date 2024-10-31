export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation 미제공 브라우저'));
    }

    navigator.geolocation.getCurrentPosition(
      (postion) => {
        const { latitude, longitude } = postion.coords;
        // 디버깅용으로 강남역 좌표 설정
        resolve({ latitude: 37.497942, longitude: 127.02761 });
      },
      (error) => {
        reject(error);
        console.log(`위치 정보 요청 실패: ${error.message}`);
      },
    );
  });
};
