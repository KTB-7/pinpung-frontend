import { useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/auth';
import useStore from '../store/store';
import SearchResultList from './SearchResultList';

const DefaultSearch = () => {
  const userId = useAuthStore((state) => state.userInfo?.userId);
  const bounds = useStore((state) => state.bounds);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const sort = searchParams.get('sort') || 'accuracy';

  return (
    <div>
      <SearchBar />
      {keyword && (
        <SearchResultList keyword={keyword} sort={sort} bounds={bounds} userId={userId} />
      )}
      <AIButton />
      <LocationButton />
    </div>
  );
};

export default DefaultSearch;
