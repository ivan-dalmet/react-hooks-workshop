import { useEffect } from 'react';
import { useQuery, queryCache } from 'react-query';
import fetcher from '../config/fetcher';

export const useCat = (catId) => useQuery(
  `images/${catId}`,
  fetcher(),
  {
    retry: 1,
  }
)

export const useCats = () => {
  const query = useQuery(
    'images/search?limit=12&order=RANDOM',
    fetcher(),
    {
      staleTime: 24 * 60 * 60 * 1000, // Prevent refetch during 24 hours
    }
  );

  useEffect(() => {
    (query.data || []).forEach((cat) => {
      queryCache.setQueryData(`images/${cat.id}`, () => cat);
    });
  }, [query.data]);

  return query;
};