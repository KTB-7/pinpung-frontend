import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!keyword || !mapRect) return;

      console.log('keyword', keyword, 'mapRect', mapRect);
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
        setSearchResults(response.searchPlaceInfoDTOList);
        console.log('백 response:', response);
      } catch (error) {
        console.error('검색 결과를 가져오는 데 실패했습니다.');
      }
    };

    fetchSearchResults();
  }, [sort, keyword, mapRect, userLocation.longitude, userLocation.latitude]);

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
          marginTop: '0.5rem',
        }}
      >
        <Button
          variant={sort === 'accuracy' ? 'secondary' : 'outline-secondary'}
          onClick={() => handleSortChange('accuracy')}
          style={{ marginRight: '0.5rem', height: '30px' }}
          size="sm" // 버튼 크기 줄이기
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

      {/* 검색 결과 리스트 */}
      <ListGroup style={{ overflowY: 'auto', height: 'calc(100vh - 120px)' }}>
        {searchResults.map((place) => (
          <ListGroup.Item
            key={place.placeId}
            onClick={() => handlePlaceClick(place.placeId)}
            className="mb-3"
          >
            <Card>
              <Card.Body className="d-flex align-items-center">
                {/* 이미지 */}
                <div style={{ marginRight: '1rem' }}>
                  {place.imageId ? (
                    <Image
                      src={`${process.env.REACT_APP_S3_BASE_URL}/original-images/${place.imageId}`}
                      alt="장소 이미지"
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#ccc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                      }}
                    ></div>
                  )}
                </div>

                {/* 장소 정보 */}
                <div>
                  <Card.Title>{place.placeName}</Card.Title>
                  <Card.Text style={{ fontSize: '0.9rem', color: '#666' }}>
                    {place.x}, {place.y} | {place.tags.join(', ')}
                  </Card.Text>
                  <Card.Text style={{ fontSize: '0.9rem', color: '#666' }}>
                    리뷰 {place.reviewCount} | {place.byFriend ? '친구가 방문한 장소' : ''}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default SearchResultList;
