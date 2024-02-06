import { useQuery } from '@tanstack/react-query';
import datasource from '../datasources/locker-room.datasource';
import { RQ_KEY } from '.';
import { MatchInterface } from '../interface';

///GET
const getAllMatches = async () => {
  const response = await datasource({ method: 'get', url: '/matches' });
  return response.data;
};

const useGetAllMatch = () => {
  return useQuery({
    queryKey: [RQ_KEY.MATCHES],
    queryFn: async () => getAllMatches(),
    retry: false,
  });
};

const getMatchByID = async (matchID: string) => {
  const response = await datasource({ method: 'get', url: `/matches/${matchID}` });
  return response.data;
};

const useGetMatchById = (matchID: string) => {
  return useQuery({
    queryKey: [RQ_KEY.MATCH, matchID],
    queryFn: async () => getMatchByID(matchID),
    staleTime: 1000,
    retry: false,
  });
};

const getMyMatch = async (userid: string) => {
  const response = await datasource({ method: 'get', url: `/matches/user/${userid}` });
  return response.data as MatchInterface[];
};

const useGetMyMatch = (userid: string) => {
  return useQuery({
    queryKey: [RQ_KEY.MY_MATCH],
    queryFn: () => getMyMatch(userid),
    staleTime: 1000,
    retry: false,
  });
};

const useGetOtherMatch = (userid: string) => {
  return useQuery({
    queryKey: [RQ_KEY.OTHER_MATCH],
    queryFn: () => getMyMatch(userid),
    staleTime: 1000,
    retry: false,
  });
};

const getMatchByUserId = async (matchID: string, userID: string) => {
  const response = await datasource({ method: 'get', url: `/matches/${matchID}/user/${userID}` });
  return response.data as MatchInterface;
};

const useGetMatchByUserId = (matchID: string, userID: string) => {
  return useQuery({
    queryKey: [RQ_KEY.MATCH, matchID],
    queryFn: async () => getMatchByUserId(matchID, userID),
    staleTime: 1000,
    retry: false,
  });
};

export const MatchRepository = { useGetAllMatch, useGetMatchById, useGetMatchByUserId, useGetMyMatch, useGetOtherMatch };
