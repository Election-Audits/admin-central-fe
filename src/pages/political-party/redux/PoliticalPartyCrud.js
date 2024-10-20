import axios from 'axios';
import { API_URL } from '../../../../globals';

export const BASE_PARTY_URL = `${API_URL}/party`;
export const BASE_PARTIES_URL = `${API_URL}/party`;

// API functions
export const getAllPoliticalParties = () => axios.get(BASE_PARTY_URL);

export const getPoliticalPartyById = (partyId) =>
  axios.get(`${BASE_PARTY_URL}/${partyId}`);

export const createPoliticalParty = (partyDetails) =>
  axios.post(BASE_PARTY_URL, partyDetails);

export const updatePoliticalParty = (partyId, partyDetails) =>
  axios.put(`${BASE_PARTY_URL}/${partyId}`, partyDetails);

export const deletePoliticalParty = (partyId) =>
  axios.delete(`${BASE_PARTY_URL}/${partyId}`);

export const updatePoliticalPartyStatus = (partyId, status) =>
  axios.put(`${BASE_PARTY_URL}/${partyId}/status`, { status });
