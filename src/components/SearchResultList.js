import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchListAccuracy, searchListDistance } from '../api/searchApi';
import useStore from '../store/store';
import { ClipLoader } from 'react-spinners';
import { Button, ListGroup, Card, Image } from 'react-bootstrap';

const SearchResultList = () => {
  const [loading, setLoading] = useState(false);

  const userLocation = useStore((state) => state.userLocation);
  const mapRect = useStore((state) => state.mapRect);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 리스트
  const keyword = searchParams.get('keyword');
  const sort = searchParams.get('sort') || 'accuracy';

  const fetchSearchResults = useCallback(async () => {
    if (!keyword || !mapRect || !userLocation) return;
    console.log('keyword', keyword, 'mapRect', mapRect);

    setLoading(true);

    try {
      let response;

      if (sort === 'accuracy') {
        response = await searchListAccuracy(
          keyword,
          mapRect.swLng,
          mapRect.swLat,
          mapRect.neLng,
          mapRect.neLat,
        );
      } else if (sort === 'distance') {
        response = await searchListDistance(
          keyword,
          mapRect.swLng,
          mapRect.swLat,
          mapRect.neLng,
          mapRect.neLat,
          userLocation.longitude,
          userLocation.latitude,
        );
      }
      setSearchResults(response.searchPlaceInfoDtoList);
      console.log('searchResults:', searchResults);
      console.log('백 response:', response);
    } catch (error) {
      console.error('검색 결과를 가져오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [keyword, mapRect, userLocation, sort]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const handleSortChange = (newSort) => {
    navigate(`/search-results?keyword=${keyword}&sort=${newSort}`);
  };

  const handlePlaceClick = (placeId) => {
    //TODO: PlaceOverview로 가게하고, 그 장소 중심으로 두고 맵 렌더링
    navigate(`/places/${placeId}`);
  };

  return (
    <div>
      {/* 정렬 버튼 */}
      <div
        className="d-flex justify-content-left mb-3"
        style={{
          marginTop: '0.7rem',
        }}
      >
        <Button
          variant={sort === 'accuracy' ? 'secondary' : 'outline-secondary'}
          onClick={() => handleSortChange('accuracy')}
          style={{ marginRight: '0.5rem', height: '30px' }}
          size="sm"
        >
          정확도순
        </Button>
        <Button
          variant={sort === 'distance' ? 'secondary' : 'outline-secondary'}
          onClick={() => handleSortChange('distance')}
          style={{ height: '30px' }}
          size="sm"
        >
          거리순
        </Button>
      </div>
      <div
        style={{
          overflowY: 'auto',
          height: 'calc(100vh - 220px)',
          padding: '0 10px',
        }}
      >
        {loading ? (
          <div>Loading...</div>
        ) : searchResults ? (
          searchResults.map((place) => (
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
                <p style={{ fontSize: '0.8rem', color: '#606060', marginBottom: '0.3rem' }}>
                  리뷰 {place.reviewCount} {place.byFriend && '  친구가 방문한 장소'}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#606060', marginBottom: '0.5rem' }}>
                  {place.x}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#484848', margin: 0 }}>
                  {place.tags?.length ? place.tags.map((tag) => `#${tag} `).join('') : ' '}
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
                      borderRadius: '8px',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                    }}
                  ></div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', color: '#888' }}>검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default SearchResultList;
