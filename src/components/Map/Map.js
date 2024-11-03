/* 사용자 위치를 기반으로 맵을 로드하고, 맵 이동 시 카페목록 갱신 */
/* global kakao */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getUserLocation } from '../../api/locationApi';
import CafeMarker from '../Markers/CafeMarker';
import { BottomSheet } from '../BottomSheet';
import { debounce } from 'lodash';

const Map = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [userLocation, setUserLocation] = useState({ latitude: 37.575877, longitude: 126.976812 });
  const [cafes, setCafes] = useState([]); // 근처 카페 목록
  const [selectedPlaceId, setSelectedPlaceId] = useState(null); // 선택된 카페 정보
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [level, setLevel] = useState(3);

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

  // 카페 목록 가져오기
  const fetchNearbyCafes = async () => {
    const radius = getRadiusByLevel(level);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/places/nearby`, {
        params: {
          x: userLocation.longitude,
          y: userLocation.latitude,
          radius: radius,
        },
      });
      setCafes(response.data.places);
      //console.log(response.data);
    } catch (error) {
      console.error('카페 목록 가져오기 실패:', error);
    }
  };

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

  // 초기 맵 로드 및 API 호출
  useEffect(() => {
    // Kakao Maps 스크립트 동적 로드
    const script = document.createElement('script');

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

        // 맵 이동 및 확대 레벨 변경 시 debounce 적용하여 카페 목록 갱신
        const handleMapChange = debounce(async () => {
          const newLevel = map.getLevel();
          if (newLevel !== level) {
            setLevel(newLevel); // 확대 레벨 변경
          } else {
            // 위치 변경 시에도 호출
            fetchNearbyCafes();
          }
        }, 200);

        kakao.maps.event.addListener(map, 'dragend', handleMapChange);
        kakao.maps.event.addListener(map, 'zoom_changed', handleMapChange);
      });
    };

    document.head.appendChild(script);
  }, [userLocation]);

  // level이 변경될 때마다 fetchNearbyCafes 호출
  useEffect(() => {
    if (mapInstance.current) {
      fetchNearbyCafes();
    }
  }, [level, userLocation]);

  const handleMarkerClick = (placeId) => {
    setSelectedPlaceId(placeId); // 선택된 카페 ID 저장하자
    setBottomSheetOpen(true);
    console.log(selectedPlaceId, 'openned');
  };

  const closeBottomSheet = () => {
    setBottomSheetOpen(false);
    console.log(selectedPlaceId, 'closed');
  };

  return (
    <div
      onClick={(e) => {
        if (e.target.id !== 'bottomSheet') {
          closeBottomSheet();
        }
      }}
    >
      <div ref={mapRef} id="map" style={{ width: '100vw', height: '92vh' }} />
      {mapInstance.current && (
        <CafeMarker cafes={cafes} map={mapInstance.current} onMarkerClick={handleMarkerClick} />
      )}
      <BottomSheet
        isOpen={isBottomSheetOpen}
        placeId={selectedPlaceId}
        onClose={closeBottomSheet}
      />
    </div>
  );
};

export default Map;
