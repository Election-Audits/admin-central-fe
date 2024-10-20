import axios from 'axios';
import { API_URL } from '../../../../globals';

export const BASE_ELECTION_URL = `${API_URL}/elections`;

// API functions
export const getAllElections = () => axios.get(BASE_ELECTION_URL);

export const getElectionById = (electionId) =>
  axios.get(`${BASE_ELECTION_URL}/${electionId}`);

export const createElection = (electionDetails) =>
  axios.post(BASE_ELECTION_URL, electionDetails);

export const updateElection = (electionId, electionDetails) =>
  axios.put(`${BASE_ELECTION_URL}/${electionId}`, electionDetails);

export const deleteElection = (electionId) =>
  axios.delete(`${BASE_ELECTION_URL}/${electionId}`);

export const updateElectionStatus = (electionId, status) =>
  axios.put(`${BASE_ELECTION_URL}/${electionId}/status`, { status });
