/* Map.js에서 전달되는 카페 목록을 바탕으로 맵에 마커를 생성하고, 클릭 시 카페 상세정보 표시 */

/* global kakao */
import { useEffect, useRef } from 'react';

const DEFAULT_MARKER_IMAGE =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

const CafeMarker = ({ cafes, map, onMarkerClick }) => {
  const markers = useRef({});

  // 데이터 가져오기
  useEffect(() => {
    if (!map || cafes.length === 0) return;

    const currentMarkers = markers.current;

    cafeData.forEach((place) => {
      // 중복 마커 방지하기
      if (!currentMarkers[place.placeId]) {
        //console.log('place:', place);
        const imageUrl = (() => {
            if (place.hasPung) {
                return place.imageWithText;
            } else {
                return DEFAULT_MARKER_IMAGE;
            }
        })();
        const markerImage = new kakao.maps.MarkerImage(imageUrl, new kakao.maps.Size(25, 40));

        // 마커 생성
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
          image: markerImage,
        });

        // // 정보 창 생성
        // const infowindow = new kakao.maps.InfoWindow({
        //   content: `<div>${place.place_name}</div>`,
        // });

        // 마커 클릭 이벤트 등록
        kakao.maps.event.addListener(marker, 'click', () => {
          onMarkerClick(place.placeId); // 클릭 시 선택된 카페 전달
        });

        // 마커를 객체에 저장 (중복 방지)
        currentMarkers[place.placeId] = marker;
      }
    });

    // 컴포넌트 언마운트 시 모든 마커 제거
    return () => {
      Object.values(currentMarkers).forEach((marker) => marker.setMap(null));
      markers.current = {}; // 메모리 초기화
    };
  }, [cafes, map, onMarkerClick]);

  return null; // UI 요소 없으므로 렌더링할 내용 없음
};

export default CafeMarker;
