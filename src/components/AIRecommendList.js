// src/components/AI/AIRecommendList.js
import { useNavigate } from 'react-router-dom';
import useAIRecommendCafes from '../hooks/useAIRecommendCafes';
import useStore from '../store/store';
import { ClipLoader } from 'react-spinners';
import { Button, Image } from 'react-bootstrap';

const AIRecommendList = () => {
  const navigate = useNavigate();
  const { swLng, swLat, neLng, neLat } = useStore((state) => state.mapRect) || {};
  const userLocation = useStore((state) => state.userLocation);
  const { latitude, longitude } = userLocation || {};

  const { data, error, isLoading } = useAIRecommendCafes(
    swLng,
    swLat,
    neLng,
    neLat,
    longitude,
    latitude,
  );
  const aiCafes = data?.places || [];

  //   if (isLoading) return <ListContainer>리스트를 불러오는 중...</ListContainer>;
  //   if (error) return <ListContainer>에러 발생</ListContainer>;

  const handlePlaceClick = (placeId) => {
    navigate(`/ai-home/places/${placeId}`);
  };

  return (
    <div
      style={{
        overflowY: 'auto',
        width: '100%',
        height: 'calc(100vh - 220px)',
        backgroundColor: 'white',
        zIndex: '3',
      }}
    >
      {isLoading ? (
        <ClipLoader />
      ) : error ? (
        <div style={{ color: '#888' }}>{error}</div>
      ) : aiCafes ? (
        aiCafes.map((place) => (
          <div
            key={place.placeId}
            onClick={() => handlePlaceClick(place.placeId)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              height: '',
              marginBottom: '0.5rem',
              cursor: 'pointer',
            }}
          >
            {/* 장소 정보 */}
            <div style={{ flex: 1, marginRight: '1rem' }}>
              <h6 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{place.placeName}</h6>
              <p style={{ fontSize: '0.8rem', color: '#606060', marginBottom: '0.5rem' }}>
                {place.address}
              </p>
              <p style={{ fontSize: '0.8rem', color: '#484848', margin: 0 }}>
                {place.tags?.length
                  ? place.tags
                      .slice(0, 3)
                      .map((tag) => `#${tag} `)
                      .join('')
                  : ' '}{' '}
              </p>
            </div>

            {/* 이미지 */}
            <div style={{ width: '130px', height: '100px', flexShrink: 0 }}>
              {place.imageId ? (
                <Image
                  src={`${process.env.REACT_APP_S3_BASE_URL}/original-images/${place.imageId}`}
                  alt="장소 이미지"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '5%',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '5%',
                  }}
                ></div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div style={{ color: '#888' }}>검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

export default AIRecommendList;
