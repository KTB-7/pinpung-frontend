export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation 미제공'));
    }

    navigator.geolocation.getCurrentPosition(
      (postion) => {
        const { latitude, longitude } = postion.coords;
        resolve({ latitude, longitude });
      },
      (error) => reject(error),
    );
  });
};
