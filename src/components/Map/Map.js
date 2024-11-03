/* 사용자 위치를 기반으로 맵을 로드하고, 맵 이동 시 카페목록 갱신 */
/* global kakao */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getUserLocation } from '../../api/locationApi';
import { fetchNearbyCafes } from '../../api/placesApi';
import CafeMarker from './CafeMarker';
import useStore from '../../store';
import { debounce } from 'lodash';

const Map = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [userLocation, setUserLocation] = useState({ latitude: 37.575877, longitude: 126.976812 });
  const [cafes, setCafes] = useState([]);
  const { openBottomSheet } = useStore();
  const [level, setLevel] = useState(3);

  useEffect(() => {
    getUserLocation()
      .then((location) => {
        setUserLocation(location);
      })
      .catch((error) => {
        console.error('위치 정보를 가져오는 중 오류 발생', error);
      });
  }, []);

  const getRadiusByLevel = (level) => {
    switch (level) {
      case 1:
        return 430;
      case 2:
        return 500;
      default: // level 3 이거나 그 이상
        return 900;
    }
  };

  // 맵 이동 및 확대 레벨 변경 시 debounce 적용하여 카페 목록 갱신
  const handleMapChange = useCallback(
    debounce(async () => {
      if (mapInstance.current) {
        const newLevel = mapInstance.current.getLevel();
        setLevel(newLevel);
        const radius = getRadiusByLevel(newLevel);
        fetchNearbyCafes(userLocation.longitude, userLocation.latitude, radius)
          .then(setCafes)
          .catch((error) => console.error('카페 목록 가져오기 실패:', error));
      }
    }, 200),
    [userLocation],
  );

  // 초기 맵 로드 및 API 호출
  useEffect(() => {
    // Kakao Maps 스크립트 동적 로드
    const script = document.createElement('script');

    // 다음에 이것도 api폴더로 빼보자..
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`;

    script.onload = () => {
      kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude),
          level: level,
        };
        const map = new kakao.maps.Map(container, options);
        mapInstance.current = map;

        kakao.maps.event.addListener(map, 'dragend', handleMapChange);
        kakao.maps.event.addListener(map, 'zoom_changed', handleMapChange);
      });
    };

    document.head.appendChild(script);
  }, [userLocation, handleMapChange]);

  const handleMarkerClick = (placeId) => {
    openBottomSheet(placeId);
  };

  return (
    <div ref={mapRef} id="map" style={{ width: '100vw', height: '92vh' }}>
      {mapInstance.current && (
        <CafeMarker cafes={cafes} map={mapInstance.current} onMarkerClick={handleMarkerClick} />
      )}
    </div>
  );
};

export default Map;
