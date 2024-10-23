/* 사용자 위치를 기반으로 맵을 로드하고, 맵 이동 시 카페목록 갱신 */

/* global kakao */
import React, { useState, useEffect, useRef } from 'react';
import { getUserLocation } from '../../services/locationService';
import { fetchCafes } from '../../services/kakaoMapService';
import CafeMarker from '../Markers/CafeMarker';
import { debounce } from 'lodash';

const KAKAO_MAP_KEY = process.env.REACT_APP_KAKAO_MAP_KEY;

const loadKakaoMapScript = () => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Kakao Map script load failed'));
    document.head.appendChild(script);
  });
};

const Map = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // Map 객체 관리
  const [userLocation, setUserLocation] = useState({ latitude: 37.575877, longitude: 126.976812 });
  const [cafes, setCafes] = useState([]); // 근처 카페 목록 저장

  // 사용자 위치 정보 가져오기
  useEffect(() => {
    getUserLocation()
      .then((location) => {
        setUserLocation(location);
      })
      .catch((error) => {
        console.error('위치 정보를 가져오는 중 오류 발생', error);
      });
  }, []);

  // 맵 스크립트 로드 및 초기 API 호출
  useEffect(() => {
    loadKakaoMapScript()
      .then(() => {
        kakao.maps.load(() => {
          const container = mapRef.current;
          const options = {
            center: new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude),
            level: 3, // 디폴트 3, 1~4 조정가능
          };
          const map = new kakao.maps.Map(container, options);
          mapInstance.current = map; // 맵 인스턴스 저장

          // 초기 렌더링 시 카페 목록 API 호출
          const bounds = map.getBounds();
          const sw = bounds.getSouthWest();
          const ne = bounds.getNorthEast();
          fetchCafes(sw, ne).then((data) => setCafes(data));

          // 맵 이동 시 debounce 적용
          const handleDragEnd = debounce(() => {
            const bounds = map.getBounds();
            const sw = bounds.getSouthWest();
            const ne = bounds.getNorthEast();
            fetchCafes(sw, ne).then((data) => setCafes(data));
          }, 200);

          // 드래그 종료 시 이벤트 등록
          kakao.maps.event.addListener(map, 'dragend', handleDragEnd);
        });
      })
      .catch((error) => console.error('맵 로드 실패:', error));
  }, [userLocation]);

  return (
    <div ref={mapRef} id="map" style={{ width: '100vw', height: '92vh' }}>
      {/* mapInstance가 초기화된 경우에만 CafeMarker 렌더링하자 */}
      {mapInstance.current && <CafeMarker cafes={cafes} map={mapInstance.current} />}
    </div>
  );
};

export default Map;
