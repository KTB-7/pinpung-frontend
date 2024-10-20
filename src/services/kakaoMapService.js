/*global kakao*/
export const fetchCafes = (center) => {
  return new Promise((resolve, reject) => {
    const ps = new kakao.maps.services.Places();
    ps.categorySearch(
      'CE7', // 카페의 카테고리 코드
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          resolve(data);
        } else {
          reject('카페 데이터를 가져오는 데 실패했습니다.');
        }
      },
      { location: center },
    );
  });
};
