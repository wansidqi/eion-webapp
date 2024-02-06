import { useQuery } from '@tanstack/react-query';
import datasource from '../datasources/locker-room.datasource';
import { RQ_KEY } from '.';

const getLatestSeason = async () => {
  const response = await datasource({ method: 'get', url: `/season/latest` });
  return response.data;
};

const useGetLatestSeason = () => {
  return useQuery({
    queryKey: [RQ_KEY.SEASON],
    queryFn: async () => getLatestSeason(),
    retry: false,
  });
};

export const SeasonRepository = {
  useGetLatestSeason,
};
