/* Map.js에서 전달되는 카페 목록을 바탕으로 맵에 마커를 생성하고, 클릭 시 카페 상세정보 표시 */

/* global kakao */
import { useEffect, useRef } from 'react';
import CafeMarkerIcon from '../../assets/icons/cafe-marker.svg';
import { cropImage } from '../../utils/imageUtils';

const DEFAULT_MARKER_IMAGE = CafeMarkerIcon; //'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

const fetchImageAsBlob = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('이미지 fetch에 실패했습니다.');
  return await response.blob();
};

const CafeMarker = ({ cafes, map, onMarkerClick }) => {
  const markers = useRef({});

  // 데이터 가져오기
  useEffect(() => {
    if (!map || cafes.length === 0) return;

    const currentMarkers = markers.current;

    cafes.forEach(async (place) => {
      // 중복 마커 방지하기
      if (!currentMarkers[place.placeId]) {
        const imageUrl = place.hasPung
          ? `${process.env.REACT_APP_S3_BASE_URL}/uploaded-images/${place.imageId}`
          : DEFAULT_MARKER_IMAGE;

        let markerImageUrl = DEFAULT_MARKER_IMAGE; // Default if no crop needed

        if (place.hasPung) {
          try {
            const imageBlob = await fetchImageAsBlob(imageUrl);
            const croppedImage = await cropImage(imageBlob);
            markerImageUrl = URL.createObjectURL(croppedImage);
          } catch (error) {
            console.error('Error cropping image:', error);
          }
        }

        const markerImage = new kakao.maps.MarkerImage(markerImageUrl, new kakao.maps.Size(40, 40)); //25, 40

        // 마커 생성
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
          image: markerImage,
        });

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
