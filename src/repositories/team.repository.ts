import { useQuery } from '@tanstack/react-query';
import datasource from '../datasources/locker-room.datasource';
import { RQ_KEY } from '.';
import { TeamInterface } from '../interface';

const getAllTeams = async () => {
  const response = await datasource({
    method: 'get',
    url: '/teams',
  });
  return response.data as TeamInterface[];
};

const useGetAllTeams = () => {
  return useQuery({
    queryKey: [RQ_KEY.TEAMS],
    queryFn: async () => getAllTeams(),
  });
};

const getTeamByID = async (teamID: string) => {
  const response = await datasource({
    method: 'get',
    url: `teams/${teamID}`,
  });
  return response.data;
};

const useGetTeam = (teamID: string) => {
  return useQuery({
    queryKey: [RQ_KEY.TEAM],
    queryFn: async () => getTeamByID(teamID),
  });
};

export const TeamRepository = {
  useGetAllTeams,
  useGetTeam,
};
