/* 카페 목록을 바탕으로 맵에 마커를 생성하고, 클릭 시 정보 창 표시 */

/* global kakao */
import { useEffect } from 'react';

const DEFAULT_MARKER_IMAGE =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

const CafeMarker = ({ cafes, map }) => {
  useEffect(() => {
    if (!map || !cafes.length === 0) return;

    const markers = cafes.map((cafe) => {
      // 이미지 적용
      const imageUrl = cafe.image || DEFAULT_MARKER_IMAGE;
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageUrl, imageSize);

      // 마커 생성
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(cafe.y, cafe.x),
        image: markerImage,
      });

      // 정보 창 생성
      const infowindow = new kakao.maps.InfoWindow({
        content: `<div>${cafe.place_name}</div>`,
      });

      // 마커 클릭 이벤트 등록
      kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.open(map, marker);
      });

      return marker;
    });

    // 컴포넌트 언마운트 시 마커 삭제
    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [cafes, map]);

  return null; // UI 요소 없으므로 렌더링할 내용 없음
};

export default CafeMarker;
