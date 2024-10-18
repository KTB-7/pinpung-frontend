/* global kakao */
import React, { useEffect, useRef } from 'react';

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

  useEffect(() => {
    loadKakaoMapScript()
      .then(() => {
        kakao.maps.load(() => {
          //const container = document.getElementById("map");
          const container = mapRef.current;
          const options = {
            center: new kakao.maps.LatLng(37.400113, 127.106766),
            level: 3, // 디폴트3, 1~4 조정가능
          };
          const map = new kakao.maps.Map(container, options);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <div ref={mapRef} id="map" style={{ width: '100vw', height: '92vh' }}></div>;
};

export default Map;
