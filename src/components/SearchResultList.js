import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchListAccuracy, searchListDistance } from '../api/searchApi';
import useAuthStore from '../store/auth';
import useStore from '../store/store';
import { Button, ListGroup, Card, Image } from 'react-bootstrap';

const SearchResultList = ({}) => {
  const userId = useAuthStore((state) => state.userInfo?.userId);
  const bounds = useStore((state) => state.bounds);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const sort = searchParams.get('sort') || 'accuracy';

  const [searchResults, setSearchResults] = useState([]); // 검색 결과 리스트

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!keyword || !bounds) return;

      try {
        let response;

        if (sort === 'accuracy') {
          response = await searchListAccuracy(
            userId,
            keyword,
            bounds.swLng,
            bounds.swLat,
            bounds.neLng,
            bounds.neLat,
          );
        } else if (sort === 'distance') {
          response = await searchListDistance(
            userId,
            keyword,
            bounds.swLng,
            bounds.swLat,
            bounds.neLng,
            bounds.neLat,
            userLocation.longitude,
            userLocation.latitude,
          );
        }
        setSearchResults(response.searchPlaceInfoDTOList);
      } catch (error) {
        console.error('검색 결과를 가져오는 데 실패했습니다.');
      }
    };

    fetchSearchResults();
  }, [sort, keyword, bounds, userId]);

  const handleSortChange = (newSort) => {
    navigate(`/search-results?keyword=${keyword}&sort${newSort}`);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h5 style={{ textAlign: 'center', marginBottom: '1rem' }}>{keyword}</h5>

      {/* 정렬 버튼 */}
      <div className="d-flex justify-content-center mb-3">
        <Button
          variant={sortType === 'accuracy' ? 'primary' : 'outline-primary'}
          onClick={() => handleSortChange('accuracy')}
          style={{ marginRight: '1rem' }}
        >
          정확도순
        </Button>
        <Button
          variant={sortType === 'distance' ? 'primary' : 'outline-primary'}
          onClick={() => handleSortChange('distance')}
        >
          거리순
        </Button>
      </div>

      {/* 검색 결과 리스트 */}
      <ListGroup>
        {searchResults.map((place) => (
          <ListGroup.Item key={place.placeId} className="mb-3">
            <Card>
              <Card.Body className="d-flex align-items-center">
                {/* 이미지 */}
                <div style={{ marginRight: '1rem' }}>
                  {place.imageId ? (
                    <Image
                      src={`${process.env.REACT_APP_S3_BASE_URL}/uploaded-images/${place.imageId}`}
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
