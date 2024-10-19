/* global kakao */
import React, { useEffect, useRef } from 'react';
import { getUserLocation } from '../services/locationService';

const KAKAO_MAP_KEY = process.env.REACT_APP_KAKAO_MAP_KEY;

const loadKakaoMapScript = () => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Kakao Map script load failed'));
    document.head.appendChild(script);
  });
};

const Map = () => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState({ latitude: 37.400113, longitude: 127.106766 });

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
    loadKakaoMapScript()
      .then(() => {
        kakao.maps.load(() => {
          const container = mapRef.current;
          const options = {
            center: new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude),
            level: 3, // 디폴트3, 1~4 조정가능
          };
          const map = new kakao.maps.Map(container, options);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userLocation]);

  return <div ref={mapRef} id="map" style={{ width: '100vw', height: '92vh' }}></div>;
};

export default Map;
