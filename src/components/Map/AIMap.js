/* 사용자 위치를 기반으로 AI 맵을 로드하고, AI 맵 이동 시 카페목록 갱신 */
/* global kakao */
/* eslint react-hooks/exhaustive-deps: "off" */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserLocation } from '../../api/locationApi';
import { fetchAIRecommendCafes } from '../../api/aiApi'; // 위에서 준 api
import useStore from '../../store/store';
import AICafeMarker from './AICafeMarker';
import { debounce } from 'lodash';

const AIMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const navigate = useNavigate();

  const userLocation = useStore((state) => state.userLocation);
  const setUserLocation = useStore((state) => state.setUserLocation);
  const mapRect = useStore((state) => state.mapRect);
  const setMapRect = useStore((state) => state.setMapRect);
  const mapLevel = useStore((state) => state.mapLevel);
  const setMapLevel = useStore((state) => state.setMapLevel);
  const moveToLocation = useStore((state) => state.moveToLocation);

  // AI추천 카페 목록 상태
  const [aiCafes, setAICafes] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const fetchAndSetUserLocation = async () => {
    try {
      const location = await getUserLocation();
      setUserLocation({ latitude: location.latitude, longitude: location.longitude });
    } catch (error) {
      console.error('위치 정보를 가져오는 중 오류 발생', error);
    }
  };

  const updateMapRect = useCallback(
    (map) => {
      const rect = map.getBounds();
      const sw = rect.getSouthWest();
      const ne = rect.getNorthEast();
      setMapRect({
        swLng: sw.getLng(),
        swLat: sw.getLat(),
        neLng: ne.getLng(),
        neLat: ne.getLat(),
      });
    },
    [setMapRect],
  );

  const handleMapChange = useCallback(() => {
    if (mapInstance.current) {
      const newLevel = mapInstance.current.getLevel();
      setMapLevel(newLevel);
      updateMapRect(mapInstance.current);
    }
  }, [setMapLevel, updateMapRect]);

  const handleMapClick = () => {
    if (isSheetOpen) {
      setIsSheetOpen(false);
      navigate('/ai-home');
    }
  };

  const initializeMap = useCallback(() => {
    const container = mapRef.current;
    const initialLevel = mapLevel ?? 3;

    if (!userLocation) return;
    const map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude),
      level: initialLevel,
    });

    mapInstance.current = map;

    // 맵 이벤트 등록
    registerMapEvents(map);

    if (!mapRect) {
      updateMapRect(map);
    }

    return () => cleanupMapEvents(map);
  }, [userLocation, mapRect, mapLevel, handleMapChange, updateMapRect]);

  // 맵 이벤트 등록 함수
  const registerMapEvents = (map) => {
    kakao.maps.event.addListener(map, 'dragend', debounce(handleMapChange, 200));
    kakao.maps.event.addListener(map, 'zoom_changed', debounce(handleMapChange, 200));
    kakao.maps.event.addListener(map, 'click', handleMapClick);
  };

  // 맵 이벤트 클린업 함수
  const cleanupMapEvents = (map) => {
    kakao.maps.event.removeListener(map, 'dragend', handleMapChange);
    kakao.maps.event.removeListener(map, 'zoom_changed', handleMapChange);
    kakao.maps.event.removeListener(map, 'click', handleMapClick);
  };

  // 사용자 위치 가져오기 1
  useEffect(() => {
    if (!userLocation) {
      fetchAndSetUserLocation();
    }
  }, [userLocation, fetchAndSetUserLocation]);

  // 사용자 위치 가져오기 2: moveToLocation 상태 변경 시 지도 중심 이동
  //(이거 맞는지 확인.. userLocation과 그냥 선택카페로 맵 중심이동과 상충되는듯)
  useEffect(() => {
    if (moveToLocation && mapInstance.current) {
      const { latitude, longitude } = moveToLocation;
      const newCenter = new kakao.maps.LatLng(latitude, longitude);
      mapInstance.current.setCenter(newCenter);
      setMapLevel(mapInstance.current.getLevel());
      setUserLocation({ latitude, longitude });
      updateMapRect(mapInstance.current);
    }
  }, [moveToLocation, updateMapRect, setMapLevel, setUserLocation]);

  // 맵 초기화 및 이벤트 리스너 등록
  useEffect(() => {
    if (userLocation) {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`;
      script.onload = () => {
        kakao.maps.load(() => {
          initializeMap();
        });
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [userLocation, initializeMap]);

  // bounds 변경 시 AI 카페 목록 다시 가져오기
  useEffect(() => {
    if (mapRect && userLocation) {
      const { swLng, swLat, neLng, neLat } = mapRect;
      console.log('swLng:', swLng);
      const { latitude: y, longitude: x } = userLocation;
      console.log('y:', y);

      fetchAIRecommendCafes(swLng, swLat, neLng, neLat, x, y)
        .then((data) => setAICafes(data.places))
        .catch((error) => console.error('AI 추천 카페 목록 가져오기 실패:', error));
    }
  }, [mapRect, userLocation]);

  const handleMarkerClick = (placeId) => {
    navigate(`/ai-home/places/${placeId}`);
    setIsSheetOpen(true);
  };

  return (
    <div
      ref={mapRef}
      id="ai-map"
      style={{ position: 'absolute', width: '100vw', height: '90vh' }}
      onClick={handleMapClick}
    >
      {mapInstance.current && (
        <AICafeMarker cafes={aiCafes} map={mapInstance.current} onMarkerClick={handleMarkerClick} />
      )}
    </div>
  );
};

export default AIMap;
