import { useQuery } from '@tanstack/react-query';
import { fetchAIRecommendCafes } from '../api/aiApi';

const useAIRecommendCafes = (swLng, swLat, neLng, neLat, x, y) => {
  return useQuery({
    queryKey: ['aiRecommendCafes', swLng, swLat, neLng, neLat, x, y],
    queryFn: () => fetchAIRecommendCafes(swLng, swLat, neLng, neLat, x, y),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    enabled: !!swLng && !!swLat && !!neLng && !!neLat && !!x && !!y, // 필요한 파라미터가 모두 있을 때만 실행하자
  });
};

export default useAIRecommendCafes;
