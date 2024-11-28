/* 사용자 위치를 기반으로 맵을 로드하고, 맵 이동 시 카페목록 갱신 */
/* global kakao */
/* eslint react-hooks/exhaustive-deps: "off" */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserLocation } from '../../api/locationApi';
import { fetchNearbyCafes } from '../../api/placesApi';
import useStore from '../../store/store';
import useAuthStore from '../../store/auth';
import CafeMarker from './CafeMarker';
import { debounce } from 'lodash';

const Map = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const userInfo = useAuthStore((state) => state.userInfo);
  const setCenter = useStore((state) => state.setCenter);

  const [userLocation, setUserLocation] = useState({ latitude: 37.400113, longitude: 127.106766 });
  const [cafes, setCafes] = useState([]);
  const [level, setLevel] = useState(3);
  const [bounds, setBounds] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const navigate = useNavigate();

  // 사용자 위치 가져오기
  useEffect(() => {
    getUserLocation()
      .then((location) => {
        setUserLocation(location);
      })
      .catch((error) => {
        console.error('위치 정보를 가져오는 중 오류 발생', error);
      });
    setCenter({ latitude: userLocation.latitude, longitude: userLocation.longitude });
  }, []);

  // 맵 변경 이벤트 처리
  const handleMapChange = () => {
    if (mapInstance.current) {
      const newLevel = mapInstance.current.getLevel();
      setLevel(newLevel);

      const rect = mapInstance.current.getBounds();
      setBounds(rect);
    }
  };

  const handleMapClick = () => {
    if (isSheetOpen) {
      setIsSheetOpen(false);
      navigate('/');
    }
  };

  // 맵 초기화 함수
  const initializeMap = useCallback(() => {
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude),
      level,
    };

    const map = new kakao.maps.Map(container, options);
    mapInstance.current = map;

    // 맵 이동 및 줌 변경 시 이벤트 리스너 등록
    kakao.maps.event.addListener(map, 'dragend', debounce(handleMapChange, 200));
    kakao.maps.event.addListener(map, 'zoom_changed', debounce(handleMapChange, 200));
    kakao.maps.event.addListener(map, 'click', handleMapClick);

    // 클린업 함수에서 이벤트 리스너 제거
    return () => {
      kakao.maps.event.removeListener(map, 'dragend', handleMapChange);
      kakao.maps.event.removeListener(map, 'zoom_changed', handleMapChange);
      kakao.maps.event.removeListener(map, 'click', handleMapClick);
    };
  }, [userLocation, level]);

  // 맵 초기화 및 이벤트 리스너 등록
  useEffect(() => {
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
  }, [initializeMap]);

  // bounds 변경 시 카페 목록 다시 가져오기
  useEffect(() => {
    if (bounds) {
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();
      const userId = userInfo.userId;

      fetchNearbyCafes(userId, sw.getLng(), sw.getLat(), ne.getLng(), ne.getLat())
        .then((data) => setCafes(data.places))
        .catch((error) => console.error('카페 목록 가져오기 실패:', error));
    }
  }, [bounds]);

  // userLocation 변경 시 맵 중심 업데이트
  useEffect(() => {
    console.log('userLocation changed');
    if (mapInstance.current) {
      const map = mapInstance.current;
      map.setCenter(new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude));
      const rect = map.getBounds();
      setBounds(rect);
    }
  }, [userLocation]);

  const handleMarkerClick = (placeId) => {
    navigate(`/places/${placeId}`);
    setIsSheetOpen(true);
  };

  return (
    <div
      ref={mapRef}
      id="map"
      style={{ position: 'absolute', width: '100vw', height: '90vh' }}
      onClick={handleMapClick}
    >
      {mapInstance.current && (
        <CafeMarker cafes={cafes} map={mapInstance.current} onMarkerClick={handleMarkerClick} />
      )}
    </div>
  );
};

export default Map;
