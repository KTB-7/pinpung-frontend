/* 사용자 위치를 기반으로 맵을 로드하고, 맵 이동 시 카페목록 갱신 */
/* global kakao */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getUserLocation } from '../../services/locationService';
import CafeMarker from '../Markers/CafeMarker';
import { BottomSheet } from '../BottomSheet';
import { debounce } from 'lodash';

const Map = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [userLocation, setUserLocation] = useState({ latitude: 37.575877, longitude: 126.976812 });
  const [cafes, setCafes] = useState([]); // 근처 카페 목록
  const [selectedCafe, setSelectedCafe] = useState(null); // 선택된 카페 정보
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

  // 사용자 위치 기반으로 카페 목록 요청
  useEffect(() => {
    getUserLocation()
      .then((location) => {
        setUserLocation(location);
      })
      .catch((error) => {
        console.error('위치 정보를 가져오는 중 오류 발생', error);
      });
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    // 카페 데이터 api로 가져오기
    const fetchNearbyCafes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/places/nearby`, {
          params: {
            x: userLocation.longitude,
            y: userLocation.latitude,
            radius: 300,
          },
        });
        setCafes(response.data.places);
      } catch (error) {
        console.error('카페 목록 가져오기 실패:', error);
      }
    };

    fetchNearbyCafes();
  }, [userLocation]);

    useEffect(() => {
    const loadMap = async () => {
      await kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        mapInstance.current = map;

        // 맵 이동 시 debounce 적용하여 카페 목록 갱신
        const handleDragEnd = debounce(async () => {
          const bounds = map.getBounds();
          const sw = bounds.getSouthWest();
          const ne = bounds.getNorthEast();
          fetchNearbyCafes(sw, ne);
        }, 200);

        // 드래그 종료 시 이벤트 등록
        kakao.maps.event.addListener(map, 'dragend', handleDragEnd);
      });
    };

    loadMap();
    }, [userLocation]);
  
  const handleMarkerClick = (placeId) => {
    setSelectedCafe(placeId); // 선택된 카페 ID 저장하자
    setBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetOpen(false);
  };

  return (
    <>
      <div ref={mapRef} id="map" style={{ width: '100vw', height: '92vh' }} />
      {mapInstance.current && (
        <CafeMarker cafes={cafes} map={mapInstance.current} onMarkerClick={handleMarkerClick} />
      )}
      <BottomSheet isOpen={isBottomSheetOpen} placeId={selectedCafe} onClose={closeBottomSheet} />
    </>
  );
};

export default Map;