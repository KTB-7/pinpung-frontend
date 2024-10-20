/* 특정 좌표를 기준으로 '카페' 카테고리로 사용자 주변 카페를 검색함 */

/* global kakao */
export const fetchCafes = (center) => {
  return new Promise((resolve, reject) => {
    const ps = new kakao.maps.services.Places();
    ps.categorySearch(
      'CE7', // 카페의 카테고리 코드
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          resolve(data);
        } else {
          reject('사용자 주변 카페 데이터를 가져오는 데 실패했습니다.');
        }
      },
      { location: center },
    );
  });
};
