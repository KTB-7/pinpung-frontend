/* 사용자 위치를 기반으로 맵을 로드하고, 맵 이동 시 카페목록 갱신 */
/* global kakao */

import React, { useState, useEffect, useRef } from 'react';
import { getUserLocation } from '../../api/locationApi';
import { fetchNearbyCafes } from '../../api/placesApi';
import CafeMarker from './CafeMarker';
import useStore from '../../store';
import { debounce } from 'lodash';
import styled from 'styled-components';

const Map = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [userLocation, setUserLocation] = useState({ latitude: 37.575877, longitude: 126.976812 });
  const [cafes, setCafes] = useState([]);
  const { openBottomSheet, isBottomSheetOpen, closeBottomSheet } = useStore();
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
        return 140;
      case 2:
        return 280;
      default: // level 3 이거나 그 이상
        return 550;
    }
  };

  useEffect(() => {
    // `debounce` 처리된 함수 생성
    const handleMapChangeDebounced = debounce(async () => {
      if (mapInstance.current) {
        const newLevel = mapInstance.current.getLevel();
        setLevel(newLevel);
        const radius = getRadiusByLevel(newLevel);
        fetchNearbyCafes(userLocation.longitude, userLocation.latitude, radius)
          .then(setCafes) // .then((cafes) => setCafes(cafes))와 같은 의미임
          .catch((error) => console.error('카페 목록 가져오기 실패:', error));
      }
    }, 200);

    // 카카오 맵 이벤트 리스너 추가
    if (mapInstance.current) {
      kakao.maps.event.addListener(mapInstance.current, 'dragend', handleMapChangeDebounced);
      kakao.maps.event.addListener(mapInstance.current, 'zoom_changed', handleMapChangeDebounced);
    }

    // 클린업 함수에서 이벤트 리스너 제거
    return () => {
      if (mapInstance.current) {
        kakao.maps.event.removeListener(mapInstance.current, 'dragend', handleMapChangeDebounced);
        kakao.maps.event.removeListener(
          mapInstance.current,
          'zoom_changed',
          handleMapChangeDebounced,
        );
      }
      handleMapChangeDebounced.cancel(); // debounce 취소하여 메모리 누수 방지
    };
  }, [userLocation]);

  // 초기 맵 로드 및 API 호출
  useEffect(() => {
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

        // `debounce` 처리된 함수 생성 및 이벤트 리스너 등록 (이거 위 함수랑 같은거임. 확인후 삭제)
        const handleMapChangeDebounced = debounce(async () => {
          if (mapInstance.current) {
            const newLevel = mapInstance.current.getLevel();
            setLevel(newLevel);
            const radius = getRadiusByLevel(newLevel);
            fetchNearbyCafes(userLocation.longitude, userLocation.latitude, radius)
              .then(setCafes)
              .catch((error) => console.error('카페 목록 가져오기 실패:', error));
          }
        }, 200);

        kakao.maps.event.addListener(map, 'dragend', handleMapChangeDebounced);
        kakao.maps.event.addListener(map, 'zoom_changed', handleMapChangeDebounced);

        // 클린업 함수에서 이벤트 리스너 제거
        return () => {
          kakao.maps.event.removeListener(map, 'dragend', handleMapChangeDebounced);
          kakao.maps.event.removeListener(map, 'zoom_changed', handleMapChangeDebounced);
          handleMapChangeDebounced.cancel(); // debounce 취소하여 메모리 누수 방지
        };
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [userLocation, level]);

  const handleMarkerClick = (placeId) => {
    openBottomSheet(placeId);
  };

  return (
    <div ref={mapRef} id="map" style={{ width: '100vw', height: '92vh' }}>
      {isBottomSheetOpen && <Overlay onClick={closeBottomSheet} />}
      {mapInstance.current && (
        <CafeMarker cafes={cafes} map={mapInstance.current} onMarkerClick={handleMarkerClick} />
      )}
    </div>
  );
};

export default Map;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: transparent;
  z-index: 9; // 맵보다는 높고 BottomSheet보다는 낮은 z-index 설정
`;
