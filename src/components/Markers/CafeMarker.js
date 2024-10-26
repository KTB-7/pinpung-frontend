/* 카페 목록을 바탕으로 맵에 마커를 생성하고, 클릭 시 정보 창 표시 */

/* global kakao */
import { useEffect, useRef, useState } from 'react';
import { fetchCafesByIds } from '../../services/placesService';

const DEFAULT_MARKER_IMAGE =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

const CafeMarker = ({ cafes, map }) => {
  const markers = useRef({});
  const [cafeData, setCafeData] = useState([]);

  // 목업 API 호출하여 데이터 가져오기
  useEffect(() => {
    if (!map || cafes.length === 0) return;

    fetchCafesByIds(cafes).then((data) => setCafeData(data));
  }, [cafes, map]);

  useEffect(() => {
    //console.log('카페데이터:', cafeData);
    if (!map || !cafeData.length === 0) return;

    const currentMarkers = markers.current;

    // 새롭게 가져온 카페 목록으로 마커 업데이트
    cafeData.forEach((place) => {
      // 중복 마커 방지하기
      if (!currentMarkers[place.placeId]) {
        //console.log('place:', place);
        const imageUrl = place.imageUrl || DEFAULT_MARKER_IMAGE;
        const imageSize = new kakao.maps.Size(40, 40);
        console.log(imageSize);
        const markerImage = new kakao.maps.MarkerImage(imageUrl, imageSize);

        // 마커 생성
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
          image: markerImage,
        });

        // 정보 창 생성
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div>${place.place_name}</div>`,
        });

        // const infomodal

        // 마커 클릭 이벤트 등록
        kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.open(map, marker);
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
  }, [cafes, map, cafeData]);

  return null; // UI 요소 없으므로 렌더링할 내용 없음
};

export default CafeMarker;
